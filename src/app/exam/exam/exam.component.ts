import { AfterViewChecked, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Moment } from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { SimpleModalService } from 'ngx-simple-modal';
import { CountdownService, LocalStorageService, Logger, PrismService, QuestionService, SyncCountdownTimeService } from '@app/core/services';
import { ConfirmComponent } from '@app/shared';
import { Exam, IDeactivateComponent, IExam, IExamQuestion, IQuestion } from '@app/core';

const log = new Logger('ExamComponent');

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements IDeactivateComponent, OnInit, AfterViewChecked, OnDestroy {
  get questionsArray(): Array<number> {
    return this.exam.questionsArray;
  }

  get currentExam(): IExam {
    return this.exam;
  }

  public examQuestion?: IExamQuestion;
  public index?: number;
  public markForReviewArray: Array<number> = [];
  private exam: Exam;
  private countdownSubscription: Subscription;
  private isNew: boolean;
  private highlighted: boolean;

  constructor(
    private simpleModalService: SimpleModalService,
    @Inject('moment') private moment: any,
    private countdownService: CountdownService,
    private syncCountdownTimeService: SyncCountdownTimeService,
    private prismService: PrismService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private questionService: QuestionService,
    private toastrService: ToastrService,
    private location: Location,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
  }

  public canExit(): boolean { // fixme
    if (this.exam.finished) {
      return true;
    } else {
      const data = {
        title: 'Confirm',
        message: 'Do you wish to finish the current exam?'
      };
      const disposable = this.simpleModalService
        .addModal(ConfirmComponent, data)
        .pipe(take(1))
        .subscribe(canFinishExam => {
          if (canFinishExam) {
            this.finishExam();
            return true;
          } else {
            return false;
          }
        });

      // We can close modal calling disposable.unsubscribe();
      // If modal was not closed manually close it by timeout
      setTimeout(() => {
        if (disposable instanceof Subscription) {
          disposable.unsubscribe();
        }
      }, 10000);
    }
  }

  ngOnInit(): void {
    this.exam = new Exam();
    const startTime = this.moment(this.exam.startAt);
    const endTime = this.moment(startTime).add(5400, 'seconds');

    this.countdownSubscription = this.countdownService
      .countdown()
      .subscribe(
        (seconds: number) => {
          if (seconds === 3600) {
            this.toastrService.success('You have another hour to finish the exam', 'Time left');
          }
          if (seconds === 1800) {
            this.toastrService.success('You have another 30 minutes to finish the exam', 'Time left');
          }
          if (seconds === 600) {
            this.toastrService.success('You have another 10 minutes to finish the exam', 'Time left');
          }
          if (seconds === 300) {
            this.toastrService.success('You have less than 5 minutes to finish the exam', 'Times left!');
          }

          const obj = this.syncCountdownTimeService.getValue();
          obj.time = this.getTimeString(endTime);
          this.syncCountdownTimeService.setValue(obj);
        },
        error => log.error(error),
        () => this.finishExam()
      );

    // countdown is started
    this.countdownService.start(5400);

    this.toastrService.success('You have 90 minutes to finish your exam. Good luck!', 'Exam simulation start!');
  }

  ngAfterViewChecked(): void {
    if (this.isNew && !this.highlighted) {
      this.prismService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnDestroy(): void {
    this.countdownSubscriptionUnsubscribe();
  }

  public setBtnClasses(index: number): object { // fixme
    let seen = false;
    for (const key in this.exam.questions) {
      if (this.exam.questions.hasOwnProperty(index)) {
        seen = true;
      }
    }

    // current question
    if (this.index === index) {
      return {'btn-danger': true};
    }

    // question mark for review
    if ((this.index !== index) && (this.markForReviewArray.indexOf(index) !== -1)) {
      return {'btn-warning': true};
    }

    // question was seen
    if ((this.index !== index) && seen) {
      return {'btn-success': true};
    }

    return {};
  }

  public getQuestion(id: number, index: number) {
    this.reset();
    this.index = index;

    if (this.exam.questions[index] === undefined) {
      // we try to get question from IndexedDB || Firebase
      this.questionService
        .getOneQuestionById(id)
        .pipe(take(1))
        .subscribe(
          question => {
            const currentQuestion = {
              id: id,
              question: question,
              markForReview: false,
              correct: false
            } as IExamQuestion;
            this.exam.setQuestion(index, currentQuestion);
            this.setCurrentQuestion(currentQuestion);
          },
          error => log.error(error)
        );
    } else {
      // question is already exist in exam object
      this.setCurrentQuestion(this.exam.questions[index]);
    }
  }

  public disabledPrevBtn(): boolean {
    return (this.index === undefined) || (this.index <= 0);
  }

  public disabledMarkForReviewBtn(): boolean {
    return (this.index === undefined);
  }

  public disabledNextBtn(): boolean {
    return (this.index === undefined) || (this.index >= 69);
  }

  public getPrevQuestion(): void {
    const index = --this.index;
    this.getQuestion(this.exam.questionsArray[index], index);
  }

  public getNextQuestion(): void {
    const index = ++this.index;
    this.getQuestion(this.exam.questionsArray[index], index);
  }

  public markForReview(): void {
    const idx = this.markForReviewArray.indexOf(this.index);
    if (idx === -1) {
      this.markForReviewArray.push(this.index);
    } else {
      this.markForReviewArray.splice(idx, 1);
    }
  }

  public goToHome(): void {
    const pageFromUrl = this.location.prepareExternalUrl(this.location.path());
    if (['/exam', '/zce/exam'].indexOf(pageFromUrl) !== -1) {
      this.router.navigate(['/home']).then();
    }
  }

  public finishExam(): void {
    this.countdownSubscriptionUnsubscribe();
    this.validateCurrentExamQuestion();
    this.exam.finish();
    const $this = this;

    const subscriber = {
      next() {
        $this.goToHome();
      },
      error(error: any) {
        log.error(error);
      },
      complete() {
        log.info(`You answered correctly to ${$this.exam.score} questions from 70`);
      }
    };

    if (this.exam.score >= 50) {
      const message = 'Congratulations you passed the exam!';
      this.toastrService.success(message, 'Exam result!', {closeButton: true}).onHidden.subscribe(subscriber);
    } else {
      const message = 'You did not passed the exam!';
      this.toastrService.warning(message, 'Exam result!', {closeButton: true}).onHidden.subscribe(subscriber);
    }
  }

  private getTimeString(endTime: Moment): string {
    const now = this.moment();
    const duration = this.moment.duration(endTime.diff(now));

    const hh = duration.hours().toString().padStart(2, '0');
    const mm = duration.minutes().toString().padStart(2, '0');
    const ss = duration.seconds().toString().padStart(2, '0');

    return hh + ':' + mm + ':' + ss;
  }

  private validateCurrentExamQuestion(): void {
    if (this.examQuestion !== undefined) {
      this.examQuestion.correct = this.examQuestion.question.validate(false);
    }
  }

  private setCurrentQuestion(question: IExamQuestion): void {
    this.examQuestion = question;
    setTimeout(() => {
      this.isNew = true;
      this.ngxUiLoaderService.stopAll();
    }, 250);
  }

  private reset(): void {
    this.validateCurrentExamQuestion();
    this.ngxUiLoaderService.start();
    this.isNew = false;
    this.highlighted = false;
  }

  private countdownSubscriptionUnsubscribe(): void {
    if (this.countdownSubscription instanceof Subscription) {
      this.countdownSubscription.unsubscribe();
    }
  }
}
