import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BehaviorSubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Logger, PrismService, QuestionService, SyncScoreService } from '@app/core/services';
import { Question } from '@app/core/models';
import { IScore } from '@app/core/interfaces';
import { PhpQuestionType } from '@app/core/enum/config';

const log = new Logger('PrepareComponent');

@Component({
  selector: 'app-prepare',
  templateUrl: './prepare.component.html'
})
export class PrepareComponent implements OnInit, AfterViewChecked, OnDestroy {
  public question?: Question | null = null;
  public PhpQuestionType = PhpQuestionType;
  public wasValidated$: BehaviorSubject<boolean>;
  private isPageHighlighted: boolean = false;
  private score?: IScore;
  private unsubscribe$: Subject<boolean> = new Subject<boolean>();

  public constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    private syncScoreService: SyncScoreService,
    private questionService: QuestionService,
    private prismService: PrismService,
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
    if ((this.question !== null) && !this.isPageHighlighted) {
      this.prismService
        .highlightAll()
        .finally(() => this.isPageHighlighted = true);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public getRandomQuestion(): void {
    this.reset();

    this.questionService
      .getQuestion(1)
      .pipe(take(1))
      .subscribe(
        question => this.question = question,
        error => log.error(error),
        () => setTimeout(() => this.ngxUiLoaderService.stopAll(), 350)
      );
  }

  public onValidate(): void {
    const isQuestionAnswerCorrect = this.question.validate(true);
    let ansType = 'WRONG';
    let className = 'error-snackbar';
    if (isQuestionAnswerCorrect) {
      ansType = 'CORRECT';
      className = 'success-snackbar';
    }
    this.syncScoreService.setValue(this.updateScore(isQuestionAnswerCorrect));

    this.wasValidated$.next(true);
    this.openSnackBar(`Your answer is: ${ansType}`, className);
  }

  private reset(): void {
    window.scrollTo(0, 0);
    this.question = null;
    this.ngxUiLoaderService.start();
    this.isPageHighlighted = false;
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

  private openSnackBar(data: any, className: string, action: string = 'next question') {
    const snack = this.snackBar.open(data, action, {
      duration: 10000,
      panelClass: [className]
    });

    snack
      .afterDismissed()
      .subscribe(
        (dismiss) => log.info(dismiss),
        error => log.error(error),
        () => this.getRandomQuestion()
      );
  }
}
