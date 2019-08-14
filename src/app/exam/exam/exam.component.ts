import {AfterViewChecked, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {PrismService, QuestionService} from '../../core/services';
import {Exam, IDeactivateComponent, IExamQuestion} from '../../core/models';
import {CountdownService} from '../../core/services/countdown/countdown.service';
import {DataShareCountdownService} from '../../core/services/data-share-countdown/data-share-countdown.service';
import {ToastContainerDirective, ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
})
export class ExamComponent implements IDeactivateComponent, OnInit, AfterViewChecked {
  @ViewChild(ToastContainerDirective, {static: true}) public toastContainer: ToastContainerDirective;
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
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    // this.toastr.overlayContainer = this.toastContainer;
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

    this.toastr.success('You have 90 minutes to finish your exam. Good luck!', 'Exam simulation start!', {timeOut: 5000});
  }

  ngAfterViewChecked() {
    this.prismService.highlightAll();
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

  get questionsArray() {
    return this.exam.questionsArray;
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms))
      .then(() => this.ngxLoader.stopAll());
  }

  public getQuestion(id, index) {
    this.ngxLoader.start();
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
    this.delay(1);
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

  public finishExam() {
    let score = 0;
    for (const key in this.exam.questions) {
      if (this.exam.questions.hasOwnProperty(key)) {
        if (this.exam.questions[key].correct === true) {
          score++;
        }
      }
    }
    alert(`You answered correctly ${score} questions out of 70`);
  }

  public canExit(): boolean {
    // const config = {
    //   enableHtml: true,
    //   closeButton: false,
    //   //
    //   disableTimeOut: true,
    //   tapToDismiss: false,
    // };
    // const msg = '  <button type="button" class="btn btn-sm btn-primary btn-block">Ok</button>\n' +
    //   '  <button type="button" class="btn btn-sm btn-primary btn-block">Cancel</button>';
    // this.toastr.show(msg, 'Do you wish to finish the current exam?', config);
    if (confirm('Do you wish to finish the current exam?')) {
      this.finishExam();
      return true;
    } else {
      return false;
    }
  }

}
