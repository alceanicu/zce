import {Component, OnInit, AfterViewChecked, Output, EventEmitter} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {DataShareService, LocalStorageService, PhpQuestionService, PrismService, SessionStorageService, IndexedDbQuizService} from '../../core/services';
import {IConfig, IQuestion, IAnswerRow, IQuestionRow} from '../../core/models';

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
    // public toastrService: ToastrService,
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

  generateRandomIdWithoutRepeatInLastN(config: IConfig, internalCounter: number = 0): number {
    const randomId = this.randomNumberFromInterval(Number(config.counter));
    let phpLastNIds = this.sessionStorageService.getItem('phpLastNIds') || [];
    if (internalCounter === 100) {
      console.log('STOP AFTER 100 TRY ...');
      return randomId;
    }
    if (phpLastNIds.indexOf(String(randomId)) === -1) {
      phpLastNIds.unshift(String(randomId));
      phpLastNIds = phpLastNIds.filter((value, key) => key < 10);
      this.sessionStorageService.setItem('phpLastNIds', phpLastNIds);
      return randomId;
    } else {
      internalCounter++;
      return this.generateRandomIdWithoutRepeatInLastN(config, internalCounter);
    }
  }

  getAnRandomQuestion() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
    this.ngxLoader.start();
    const $this = this;
    this.reset();
    this.localStorageService.getAppConfig().subscribe((config) => {
      const randomId = this.generateRandomIdWithoutRepeatInLastN(config);
      console.log(`Generate an random id for question ... [randomId =${randomId}]`);

      this.indexedDbQuizService
        .getQuestionById(randomId)
        .then(async (question) => {
          if (!question) {
            console.log(`Question with id=${randomId} does not EXIST in IndexedDB`);
            $this.getQuestionFromFirebase(randomId);
          } else {
            console.log(`Question with id=${randomId} EXIST in IndexedDB - WE GET IT FROM IndexedDB`);
            $this.setQuestion(question);
          }
        })
        .catch(e => {
          console.log((e.stack || e));
          $this.getQuestionFromFirebase(randomId);
        });
    });
  }

  saveToIndexedDb(question: IQuestion) {
    this.indexedDbQuizService
      .addQuestion(question)
      .then(async (key) => {
        console.log(`Question is now saved in IndexedDB [id=${key}]`);
      })
      .catch(e => {
        console.log(`Question can not be saved in IndexedDB`);
        console.log((e.stack || e));
      });
  }

  setQuestion(question: IQuestion) {
    question.answerRows.sort(() => Math.random() - 0.5);
    question.answerRows.forEach((obj, key) => { // FIXME
      obj.userAnswer = false;
    });
    question.finalAnswer = false;
    this.question = question;
    this.prismService.highlightAll();
    const $this = this;
    setTimeout(() => {
      $this.ngxLoader.stopAll();
    }, 200)
    ;
  }

  getQuestionFromFirebase(randomId) {
    console.log('We try to get question from FIREBASE');
    const $this = this;
    this.firestorePhpQuestionService.getQuestion(String(randomId)).subscribe(
      DocumentSnapshot => {
        const question = DocumentSnapshot.data() as IQuestion;
        if (question) {
          $this.saveToIndexedDb(question);
          $this.setQuestion(question);
        } else {
          throw new Error('Something bad happened');
        }
      },
      (error) => {
        $this.ngxLoader.stopAll();
        console.log('Can not get question from FIREBASE');
        console.error(error);
        // this.toastrService.error(`ERROR => ${error}`);
      },
      () => {
        console.log('Random Question complete');
        $this.prismService.highlightAll();
      }
    );
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

  randomNumberFromInterval(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
