import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';

import { BehaviorSubject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import * as moment from 'moment';
import { Moment } from 'moment';

import { environment } from '@env/environment';
import { ConfirmComponent } from '@app/shared/confirm/confirm.component';
import { CountdownService, Logger, PrismService, QuestionService, SyncCountdownTimeService } from '@app/core/services';
import { Exam, IDeactivate } from '@app/core';
import { PhpQuestionType } from '@app/core/enum/config';

const log = new Logger('ExamComponent');

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html'
})
export class ExamComponent implements IDeactivate, OnInit, AfterViewChecked, OnDestroy {
  public exam: Exam;
  public PhpQuestionType = PhpQuestionType;
  public wasValidated$: BehaviorSubject<boolean>;
  private isPageHighlighted: boolean = false;
  private countdownSubscription: Subscription;

  public constructor(
    private router: Router,
    private dialog: MatDialog,
    private location: Location,
    private snackBar: MatSnackBar,
    private prismService: PrismService,
    private questionService: QuestionService,
    private countdownService: CountdownService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private syncCountdownTimeService: SyncCountdownTimeService
  ) {
    this.wasValidated$ = new BehaviorSubject(false);
    this.wasValidated$.next(false);
  }

  ngOnInit(): void {
    this.exam = new Exam();
    const startTime = moment(this.exam.startAt);
    const endTime = moment(startTime).add(environment.configPHP.examTime, 'seconds');
    this.countdownSubscription = this.countdownService
      .countdown()
      .subscribe(
        (seconds: number) => {
          let infoMsg = '';
          switch (seconds) {
            case 3600:
              infoMsg = 'You have 1 hour to finish the exam';
              break;
            case 1800:
              infoMsg = 'You have another 30 minutes to finish the exam';
              break;
            case 600:
              infoMsg = 'You have another 10 minutes to finish the exam';
              break;
            case 300:
              infoMsg = 'You have less than 5 minutes to finish the exam';
              break;
            default:
              infoMsg = '';
          }

          if (infoMsg !== '') {
            this.openSnackBar(infoMsg, 'info-snackbar');
          }

          const obj = this.syncCountdownTimeService.getValue();
          obj.time = this.getTimeString(endTime);
          this.syncCountdownTimeService.setValue(obj);
        },
        error => log.error(error),
        () => this.finishExam()
      );

    // countdown is starting
    this.countdownService.start(environment.configPHP.examTime);

    this.openSnackBar(`You have 90 minutes to finish your exam. Good luck!`, 'info-snackbar');

    this.getQuestion(0);
  }

  ngAfterViewChecked(): void {
    if ((this.exam.questions[this.exam.index] !== null) && !this.isPageHighlighted) {
      this.prismService
        .highlightAll()
        .finally(() => this.isPageHighlighted = true);
    }
  }

  ngOnDestroy(): void {
    this.countdownSubscriptionUnsubscribe();
  }

  canExit(): boolean {
    if (this.exam.isFinished) {
      return true;
    } else {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          message: 'Do you wish to finish the current exam?',
          buttonText: {
            ok: 'YES',
            cancel: 'NO'
          }
        }
      });

      dialogRef.afterClosed().subscribe((confirmed: boolean) => {
        if (confirmed) {
          this.finishExam();
          return true;
        } else {
          return false;
        }
      });
    }
  }

  get currentIndex(): number {
    return this.exam.index;
  }

  get isDisabledPrevBtn(): boolean {
    return (this.exam.index === undefined) || (this.exam.index <= 0);
  }

  get isDisabledNextBtn(): boolean {
    return (this.exam.index === undefined) || (this.exam.index >= environment.configPHP.examSize - 1);
  }

  get isDisabledMarkForReviewBtn(): boolean {
    return (this.exam.index === undefined);
  }

  get hasMarkForReview(): boolean {
    return (this.exam.markForReviewArray.length > 0);
  }

  public clickMark(event: MatButtonToggleChange): void {
    this.getQuestion(event.value);
  }

  public tabClick(event: MatTabChangeEvent): void {
    this.getQuestion(event.index);
  }

  public getPrevQuestion(): void {
    --this.exam.index;
  }

  public getNextQuestion(): void {
    ++this.exam.index;
  }

  public markForReview(): void {
    this.exam.markForReview();
  }

  public goToHome(): void {
    const pageFromUrl = this.location
      .prepareExternalUrl(this.location.path())
      .replace('#', '');
    if (['/exam'].indexOf(pageFromUrl) !== -1) {
      this.router.navigate(['/home']).then(e => {
        if (e) {
          log.info('Go to home page');
        }
      });
    }
  }

  private finishExam(): void {
    this.countdownSubscriptionUnsubscribe();
    this.exam.finish();
    this.router
      .navigate(['/home'], { state: { score: this.exam.score } })
      .then(e => {
        if (e) {
          log.info('Go to home page');
        }
      });
  }

  private getQuestion(index: number): void {
    window.scrollTo(0, 0);
    this.ngxUiLoaderService.start();
    this.isPageHighlighted = false;
    this.exam.index = index;

    if (this.exam.questions[index] === null) {
      const id = this.exam.questionsArray[index];
      // we try to get question from IndexedDB || Firebase
      this.questionService
        .getOneQuestionById(id)
        .pipe(take(1))
        .subscribe(
          question => this.exam.setQuestion(index, question),
          error => log.error(error),
          () => setTimeout(() => this.ngxUiLoaderService.stopAll(), 350)
        );
    } else {
      // question is already exist in exam object
      setTimeout(() => this.ngxUiLoaderService.stopAll(), 350);
    }
  }

  private getTimeString(endTime: Moment): string {
    const now = moment();
    const duration = moment.duration(endTime.diff(now));

    const hh = duration.hours().toString().padStart(2, '0');
    const mm = duration.minutes().toString().padStart(2, '0');
    const ss = duration.seconds().toString().padStart(2, '0');

    return hh + ':' + mm + ':' + ss;
  }

  private countdownSubscriptionUnsubscribe(): void {
    this.syncCountdownTimeService.clear();
    if (this.countdownSubscription instanceof Subscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  private openSnackBar(data: any, className: string, action: string = 'close'): void {
    this.snackBar.open(data, action, {
      duration: 5000,
      panelClass: [className]
    });
  }
}
