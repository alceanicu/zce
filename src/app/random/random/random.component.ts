import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {
  DataShareService,
  IndexedDbQuizService,
  LocalStorageService,
  PhpQuestionService,
  PrismService,
  QuestionService
} from '../../core/services';
import {IAnswerRow, IQuestion, IQuestionRow} from '../../core/models';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html'
})
export class RandomComponent implements OnInit, AfterViewChecked {
  public isCorrect: boolean;
  public btnText: string;
  public question: IQuestion;
  public message: any;
  private interval: any = null;
  private isNew = false;
  private highlighted = false;

  constructor(
    private ngxUiLoaderService: NgxUiLoaderService,
    private dataShareService: DataShareService,
    private indexedDbQuizService: IndexedDbQuizService,
    private localStorageService: LocalStorageService,
    private firestorePhpQuestionService: PhpQuestionService,
    private prismService: PrismService,
    private questionService: QuestionService
  ) {
  }

  ngOnInit() {
    this.dataShareService.currentScore.subscribe(message => {
      this.message = message;
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

  setQuestion(question: IQuestion) {
    question.answerRows.forEach((obj, key) => { // FIXME
      obj.userAnswer = false;
    });
    question.finalAnswer = false;
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
    this.question = {
      id: null,
      category: 1,
      difficulty: 1,
      type: 1,
      finalAnswer: false,
      questionRows: [<IQuestionRow> {}],
      answerRows: [<IAnswerRow> {}, <IAnswerRow> {}, <IAnswerRow> {}, <IAnswerRow> {}],
    };
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
    this.dataShareService.updatePercentage(this.isCorrect);
    const ansType = this.isCorrect ? 'Correct' : 'Wrong';
    this.btnText = `${ansType} [new quiz in ${countDown} seconds]`;

    // const interval = setInterval(function () {
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

}
