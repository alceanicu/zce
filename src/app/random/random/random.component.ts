import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {
  DataShareService,
  IndexedDbQuizService,
  LocalStorageService,
  PhpQuestionService,
  PrismService,
  QuestionService,
  SessionStorageService
} from '../../core/services';
import {IAnswerRow, IQuestion, IQuestionRow} from '../../core/models';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit, AfterViewChecked {
  public isCorrect: boolean;
  public btnText: string;
  public question: IQuestion;
  public message: any;
  private interval: any = null;

  constructor(
    private firestorePhpQuestionService: PhpQuestionService,
    private indexedDbQuizService: IndexedDbQuizService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private prismService: PrismService,
    private ngxLoader: NgxUiLoaderService,
    private sync: DataShareService,
    private questionService: QuestionService,
  ) {
  }

  ngAfterViewChecked() {
    this.prismService.highlightAll();
  }

  ngOnInit() {
    this.sync.currentScore.subscribe(message => {
      this.message = message;
    });
    this.getAnRandomQuestion();
  }

  getAnRandomQuestion() {
    const $this = this;
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.ngxLoader.start();
    this.reset();
    this.questionService.getQuestion().subscribe((question) => {
      $this.setQuestion(question);
    });
  }

  setQuestion(question: IQuestion) {
    question.answerRows.forEach((obj, key) => { // FIXME
      obj.userAnswer = false;
    });
    question.finalAnswer = false;
    this.question = question;
    this.prismService.highlightAll(); // FIXME
    const $this = this;
    setTimeout(() => {
      $this.ngxLoader.stopAll();
    }, 200)
    ;
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
    this.sync.updatePercentage(this.isCorrect);
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
