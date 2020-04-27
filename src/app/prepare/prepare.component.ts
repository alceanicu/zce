import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BehaviorSubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Logger, PrismService, QuestionService, SyncScoreService } from '@app/core/services';
import { Question } from '@app/core/models';
import { IScore } from '@app/core/interfaces';
import { PhpHighlightingLanguage, PhpQuestionType } from '@app/core/enum/config';

const log = new Logger('PrepareComponent');

@Component({
  selector: 'app-prepare',
  templateUrl: './prepare.component.html'
})
export class PrepareComponent implements OnInit, AfterViewChecked, OnDestroy {
  public question?: Question;
  public isQuestionLoaded: boolean = false;
  public isQuestionAnswerCorrect: boolean = false;
  private isPageHighlighted: boolean = false;
  private btnText: string = '';
  private score?: IScore;
  private interval?: NodeJS.Timeout = null;
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();
  public PhpHighlightingLanguage = PhpHighlightingLanguage;
  public PhpQuestionType = PhpQuestionType;
  public wasValidated$: BehaviorSubject<boolean>;

  public constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    private prismService: PrismService,
    private questionService: QuestionService,
    private syncScoreService: SyncScoreService,
    private snackBar: MatSnackBar
  ) {
    this.wasValidated$ = new BehaviorSubject(false);
    this.wasValidated$.next(false);
  }

  ngOnInit(): void {
    this.syncScoreService.currentValue
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (score: IScore) => this.score = score,
        error => log.error(error)
      );

    this.getRandomQuestion();
  }

  ngAfterViewChecked(): void {
    if (this.isQuestionLoaded && !this.isPageHighlighted) {
      log.info('HIGHLIGHT All Page elements');
      this.prismService.highlightAll();
      this.isPageHighlighted = true;
    }
  }

  ngOnDestroy(): void {
    log.info('on ngOnDestroy');
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  get buttonText(): string {
    return this.btnText;
  }

  public getRandomQuestion(): void {
    this.reset();

    this.questionService
      .getQuestion(1)
      .pipe(take(1))
      .subscribe(
        question => {
          this.question = question;
          this.isQuestionLoaded = true;
        },
        error => log.error(error),
        () => {
          setTimeout(() => this.ngxUiLoaderService.stopAll(), 350);
        }
      );
  }

  public onValidate(countDown: number = 10): void {
    this.isQuestionAnswerCorrect = this.question.validate(true);
    this.syncScoreService.setValue(this.updateScore(this.isQuestionAnswerCorrect));
    const ansType = this.isQuestionAnswerCorrect ? 'CORRECT' : 'WRONG';
    this.btnText = `NEXT QUESTION [${countDown}]`;

    this.wasValidated$.next(true);
    this.openSnackBar(`Your answer is: ${ansType}`, this.isQuestionAnswerCorrect ? 'success-snackbar' : 'error-snackbar');

    this.interval = setInterval(() => {
      countDown--;
      this.btnText = `NEXT QUESTION [${countDown}]`;

      if (countDown === 0) {
        this.getRandomQuestion();
      }
    }, 1000);
  }

  private reset(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.ngxUiLoaderService.start();
    this.isQuestionLoaded = false;
    this.isQuestionAnswerCorrect = false;
    this.isPageHighlighted = false;
    this.btnText = 'Get next question now ';
  }

  private updateScore(isCorrect: boolean): IScore {
    this.score = this.syncScoreService.getValue();
    ++this.score.total;
    if (isCorrect) {
      ++this.score.correct;
    }
    this.score.percentage = Math.floor((this.score.correct * 100) / this.score.total);

    return this.score;
  }

  private openSnackBar(data: any, className: string, action: string = 'close') {
    const snack = this.snackBar.open(data, action, {
      duration: 5 * 1000,
      panelClass: [className]
    });

    // snack.afterDismissed().subscribe(() => {
    //   this.getRandomQuestion();
    // });
  }
}
