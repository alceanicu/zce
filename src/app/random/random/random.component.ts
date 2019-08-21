import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {
  IndexedDbQuizService,
  LocalStorageService,
  PhpQuestionService,
  PrismService,
  QuestionService,
  ScoreSyncService,
} from '../../core/services';
import {IQuestion, IScore, Question} from '../../core/models';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html'
})
export class RandomComponent implements OnInit, AfterViewChecked {
  public isCorrect: boolean;
  public btnText: string;
  public question: Question;
  public score: IScore;
  private interval: any = null;
  private isNew = false;
  private highlighted = false;

  constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    private indexedDbQuizService: IndexedDbQuizService,
    private localStorageService: LocalStorageService,
    private firestorePhpQuestionService: PhpQuestionService,
    private prismService: PrismService,
    private questionService: QuestionService,
    private scoreSyncService: ScoreSyncService
  ) {
  }

  ngOnInit() {
    this.scoreSyncService.currentValue.subscribe(value => {
      this.score = value;
    });
    this.getAnRandomQuestion();
  }

  ngAfterViewChecked() {
    if (this.isNew && !this.highlighted) {
      this.prismService.highlightAll();
      this.highlighted = true;
    }
  }

  getAnRandomQuestion() {
    this.isNew = false;
    this.highlighted = false;
    const $this = this;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.ngxUiLoaderService.start();
    this.reset();
    this.questionService.getQuestion().subscribe((question) => {
      $this.setQuestion(question);
    }, error => {
      console.log(error);
    });
  }

  setQuestion(question: Question) {
    this.question = question;
    const $this = this;
    setTimeout(() => {
      $this.ngxUiLoaderService.stopAll();
    }, 200);
    this.isNew = true;
  }

  reset() {
    this.isCorrect = true;
    this.btnText = 'Get next question now ';
    this.question = new Question(<IQuestion> {});
  }

  validateEachAnswerRows() {
    let ok = true;
    this.question.answerRows.forEach((obj, key) => {
      ok = ok && (obj.correct === obj.userAnswer);
    });
    this.isCorrect = ok;
  }

  onValidate(countDown: number = 10) {
    const $this = this;
    this.question.finalAnswer = true;
    this.validateEachAnswerRows();

    this.scoreSyncService.setValue(this.updateScore(this.isCorrect));
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

  updateScore(isCorrect: boolean): IScore {
    const score = this.scoreSyncService.getValue();
    score.total = score.total + 1;
    score.correct = isCorrect ? (score.correct + 1) : score.correct;
    score.percentage = Math.floor((score.correct * 100) / score.total);

    return score;
  }

}
