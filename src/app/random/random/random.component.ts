import { AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PrismService, QuestionService, SyncScoreService } from '../../core/services';
import { Question } from '../../core/models';
import { IScore } from '../../core/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html'
})
export class RandomComponent implements OnInit, AfterViewChecked, OnDestroy {
  public isCorrect: boolean;
  public btnText: string;
  public question: Question;
  private score: IScore;
  private interval: any;
  private isNew: boolean;
  private highlighted: boolean;
  private subscription: Subscription;
  private scoreSubscription: Subscription;

  constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    private prismService: PrismService,
    private questionService: QuestionService,
    private syncScoreService: SyncScoreService
  ) {
  }

  ngOnInit(): void {
    this.scoreSubscription = this.syncScoreService.currentValue.subscribe(
      score => this.score = score
    );
    this.getAnRandomQuestion();
  }

  ngAfterViewChecked() {
    if (this.isNew && !this.highlighted) {
      this.prismService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnDestroy(): void {
    this.scoreSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  private getAnRandomQuestion() {
    this.reset();
    const $this = this;
    this.subscription = this.questionService.getQuestion().subscribe(
      question => $this.setQuestion(question),
      error => console.log(error)
    );
  }

  private setQuestion(question: Question) {
    this.question = question;
    const $this = this;
    setTimeout(() => {
      $this.ngxUiLoaderService.stopAll();
      this.isNew = true;
    }, 400);
  }

  private reset() {
    if (this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.ngxUiLoaderService.start();
    this.isNew = false;
    this.highlighted = false;
    this.isCorrect = false;
    this.btnText = 'Get next question now ';
    this.question = new Question();
  }

  onValidate(countDown: number = 10) {
    const $this = this;
    this.isCorrect = this.question.validate(true);

    this.syncScoreService.setValue(this.updateScore(this.isCorrect));
    const ansType = this.isCorrect ? 'Correct' : 'Wrong';
    this.btnText = `${ansType} [new quiz in ${countDown} seconds]`;

    $this.interval = setInterval(() => {
      countDown--;
      if (countDown === 1) {
        $this.btnText = `${ansType} [new quiz in ${countDown} second] or push to get it now`;
      } else {
        $this.btnText = `${ansType} [new quiz in ${countDown} seconds] or push to get it now`;
      }

      if (countDown === 0) {
        $this.getAnRandomQuestion();
      }
    }, 1000);
  }

  private updateScore(isCorrect: boolean): IScore {
    const score = this.syncScoreService.getValue();
    score.total = score.total + 1;
    score.correct = isCorrect ? (score.correct + 1) : score.correct;
    score.percentage = Math.floor((score.correct * 100) / score.total);

    return score;
  }

}
