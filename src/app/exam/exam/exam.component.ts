import {AfterViewChecked, Component, Inject, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {PrismService, QuestionService} from '../../core/services';
import {IExamQuestion, Exam, IDeactivateComponent} from '../../core/models';
import {CountdownService} from '../../core/services/countdown/countdown.service';
import {DataShareCountdownService} from '../../core/services/data-share-countdown/data-share-countdown.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements IDeactivateComponent, OnInit, AfterViewChecked {
  private exam: Exam;
  public examQuestion?: IExamQuestion;
  public index?: number;
  public markForReviewArray = [];
  public timeString: string | number;

  constructor(
    @Inject('moment') private moment,
    private sync: DataShareCountdownService,
    private countdownService: CountdownService,
    private prismService: PrismService,
    private ngxLoader: NgxUiLoaderService,
    private questionService: QuestionService,
  ) {
  }

  ngOnInit() {
    const $this = this;
    this.exam = new Exam();

    // first subscriber subscribes
    this.countdownService.countdown().subscribe(
      t => {
        const now = this.moment();
        const startTime = this.moment(this.exam.startAt);
        const endTime = this.moment(startTime).add(90, 'minutes'); // FIXME
        const duration = this.moment.duration(endTime.diff(now));
        const h = (duration.hours() < 10) ? ('0' + duration.hours()) : duration.hours();
        const m = (duration.minutes() < 10) ? ('0' + duration.minutes()) : duration.minutes();
        const s = (duration.seconds() < 10) ? ('0' + duration.seconds()) : duration.seconds();
        this.timeString = h + ':' + m + ':' + s;
        $this.sync.updateCurrentCountdownTime(this.timeString);
      },
      null,
      () => this.timeString = 'Done!' // FIXME
    );

    // countdown is started
    this.countdownService.start(this.exam.startAt);
  }

  public setBtnClasses(index) {
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
  }

  ngAfterViewChecked() {
    this.prismService.highlightAll();
  }

  get questionsArray() {
    return this.exam.questionsArray;
  }

  public getQuestion(id, index) {
    this.updateExamScore();
    this.index = index;

    if (this.exam.questions[index] === undefined) {
      const $this = this;
      this.questionService.getOneQuestionById(id).subscribe((question) => {
        const q = {
          id: id,
          question: question,
          markForReview: false,
          correct: false
        } as IExamQuestion;
        $this.exam.questions[index] = q;
        $this.examQuestion = q;
      });
    } else {
      this.examQuestion = this.exam.questions[index];
    }
  }

  private updateExamScore() {
    if (this.examQuestion !== undefined) {
      this.validateEachAnswerRows();
    }
  }

  validateEachAnswerRows() {
    let ok = true;
    this.examQuestion.question.answerRows.forEach((obj, key) => {
      ok = ok && (obj.correct === obj.userAnswer);
    });

    if (ok) {
      this.examQuestion.correct = true;
    }
  }

  public disabledPrevBtn() {
    return (this.index === undefined) || (this.index <= 0);
  }

  public disabledMarkForReviewBtn() {
    return (this.index === undefined);
  }

  public disabledNextBtn() {
    return (this.index === undefined) || (this.index >= 69);
  }

  public getPrevQuestion() {
    const index = --this.index;
    this.getQuestion(this.exam.questionsArray[index], index);
  }

  public getNextQuestion() {
    const index = ++this.index;
    this.getQuestion(this.exam.questionsArray[index], index);
  }

  public markForReview() {
    const idx = this.markForReviewArray.indexOf(this.index);
    if (idx === -1) {
      this.markForReviewArray.push(this.index);
    } else {
      this.markForReviewArray.splice(idx, 1);
    }
  }

  public finshExam() {
    const qObj = this.exam.questions;
    let score = 0;
    for (const key in qObj) {
      if (qObj.hasOwnProperty(key)) {
        if (qObj[key].correct === true) {
          score++;
        }
      }
    }
    alert('You answered correctly ' + score + ' questions out of 70');
  }

  public canExit(): boolean {
    if (confirm('Do you wish to finish the current exam?')) {
      this.finshExam();
      return true;
    } else {
      return false;
    }
  }

}
