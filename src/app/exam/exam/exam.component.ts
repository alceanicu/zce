import {AfterViewChecked, Component, Inject, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {PrismService, QuestionService} from '../../core/services';
import {Exam, IDeactivateComponent, IExamQuestion} from '../../core/models';
import {CountdownService} from '../../core/services/countdown/countdown.service';
import {DataShareCountdownService} from '../../core/services/data-share-countdown/data-share-countdown.service';
import {ToastrService} from 'ngx-toastr';
import {Moment} from 'moment';
import {Subscription} from 'rxjs';
import {SimpleModalService} from 'ngx-simple-modal';
import {ConfirmComponent} from '../../shared/confirm/confirm/confirm.component';

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
  public subscription?: Subscription;

  constructor(
    private simpleModalService: SimpleModalService,
    @Inject('moment') private moment,
    private sync: DataShareCountdownService,
    private countdownService: CountdownService,
    private prismService: PrismService,
    private ngxLoader: NgxUiLoaderService,
    private questionService: QuestionService,
    private toastrService: ToastrService,
    private location: Location,
    private router: Router
  ) {
  }

  public canExit(): boolean {
    if (this.exam.finished) {
      return true;
    } else {
      const disposable = this.simpleModalService.addModal(ConfirmComponent, {
        title: 'Confirm',
        message: 'Do you wish to finish the current exam?'
      }).subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.finishExam();
          return true;
        } else {
          return false;
        }
      });

      // We can close modal calling disposable.unsubscribe();
      // If modal was not closed manually close it by timeout
      setTimeout(() => {
        disposable.unsubscribe();
      }, 10000);
    }
  }

  ngOnInit() {
    const $this = this;
    this.exam = new Exam();
    const startTime = this.moment(this.exam.startAt);
    const endTime = this.moment(startTime).add(5400, 'seconds');

    // first subscriber subscribes
    this.subscription = this.countdownService.countdown().subscribe(
      (seconds: number) => {
        if (seconds === 3600) {
          this.toastrService.success('You have another hour to finish the exam', 'Time left');
        }
        if (seconds === 1800) {
          this.toastrService.success('You have another 30 minutes to finish the exam', 'Time left');
        }
        if (seconds === 600) {
          this.toastrService.success('You have another 10 minutes to finish the exam', 'Time left');
        }
        if (seconds === 300) {
          this.toastrService.success('You have less than 5 minutes to finish the exam', 'Times left!');
        }
        $this.sync.updateCurrentCountdownTime(this.getTimeString(endTime));
      },
      error => {
        console.log(error);
      },
      () => {
        this.finishExam();
      }
    );

    // countdown is started
    this.countdownService.start(5400);

    this.toastrService.success('You have 90 minutes to finish your exam. Good luck!', 'Exam simulation start!');
  }

  ngAfterViewChecked() {
    this.prismService.highlightAll();
  }

  private getTimeString(endTime: Moment): string {
    const now = this.moment();
    const duration = this.moment.duration(endTime.diff(now));

    const hh = duration.hours().toString().padStart(2, '0');
    const mm = duration.minutes().toString().padStart(2, '0');
    const ss = duration.seconds().toString().padStart(2, '0');

    return hh + ':' + mm + ':' + ss;
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

  get currentExam() {
    return this.exam;
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

  public goToHome() {
    const pageFromUrl = this.location.prepareExternalUrl(this.location.path());
    if (['/exam', '/zce/exam'].indexOf(pageFromUrl) !== -1) {
      this.router.navigate(['/home']).then();
    }
  }

  public finishExam() {
    this.exam.finished = true;
    this.subscription.unsubscribe();

    let score = 0;
    for (const key in this.exam.questions) {
      if (this.exam.questions.hasOwnProperty(key)) {
        if (this.exam.questions[key].correct === true) {
          score++;
        }
      }
    }

    const config = {closeButton: true};
    const title = 'Exam result!';

    if (score >= 50) {
      const message = 'Congratulations you passed the exam!';
      this.toastrService.success(message, title, config).onHidden.subscribe(() => {
        this.goToHome();
      }, error => {
        console.log(error);
      }, () => {
        console.log(`You answered correctly to ${score} questions from 70`);
      });
    } else {
      const message = 'You did not passed the exam!';
      this.toastrService.warning(message, title, config).onHidden.subscribe(() => {
        this.goToHome();
      }, error => {
        console.log(error);
      }, () => {
        console.log(`You answered correctly to ${score} questions from 70`);
      });
    }
  }

}
