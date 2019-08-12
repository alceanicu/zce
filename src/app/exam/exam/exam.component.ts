import {AfterViewChecked, Component, Inject, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {PrismService, QuestionService} from '../../core/services';
import {IExamQuestion, Exam, IDeactivateComponent} from '../../core/models';
import {CountdownService} from '../../core/services/countdown/countdown.service';

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
  public value1: string | number;

  constructor(
    @Inject('moment') private moment,
    private countdownService: CountdownService,
    private prismService: PrismService,
    private ngxLoader: NgxUiLoaderService,
    private questionService: QuestionService,
  ) {
  }

  ngOnInit() {
    this.exam = new Exam();

    // first subscriber subscribes
    this.countdownService.countdown().subscribe(
      t => {
        const eventTime = t;
        const currentTime = this.moment().unix();
        console.log(eventTime);
        console.log(currentTime);
        let diffTime = eventTime - currentTime;
        let duration = this.moment.duration(diffTime * 1000, 'milliseconds');
        // let interval = 1000;

        // setInterval(function(){
        //   duration = moment.duration(duration - interval, 'milliseconds');
        //   $('.countdown').text(duration.hours() + ":" + duration.minutes() + ":" + duration.seconds())
        // }, interval);

        this.value1 = duration.hours() + ':' + duration.minutes() + ':' + duration.seconds();
        // this.value1 = t;
        // this.value1 = moment().format('YYYY-MM-DD HH:mm:ss');
        // this.value1 = moment.unix(t).format('HH:mm:ss');
        //
        // let diffTime = eventTime - Date.now();
        // var duration = moment.duration( diffTime, 'milliseconds' );
      },
      null,
      () => this.value1 = 'Done!' // fixme
    );

    // countdown is started
    this.countdownService.start(this.exam.startAt);
  }

  public setBtnClasses(index) {
    return {
      'btn-danger': this.index === index,
      'btn-warning': (this.index !== index) && (this.markForReviewArray.indexOf(index) === -1),
      'btn-info': (this.index !== index) && (this.markForReviewArray.indexOf(index) !== -1)
    };
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
    let qObj = this.exam.questions;
    let score = 0;
    for (var key in qObj) {
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
