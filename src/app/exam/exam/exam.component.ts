import { AfterViewChecked, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { SimpleModalService } from 'ngx-simple-modal';
import { CountdownService, LocalStorageService, PrismService, QuestionService, SyncCountdownTimeService } from '../../core/services';
import { ConfirmComponent } from '../../shared';
import { Exam, IDeactivateComponent, IExamQuestion, IQuestion } from '../../core';


@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements IDeactivateComponent, OnInit, AfterViewChecked, OnDestroy {
  private exam: Exam;
  public examQuestion?: IExamQuestion;
  public index?: number;
  public markForReviewArray = [];
  private subscriptions: Subscription[] = [];
  private subscription: Subscription;
  private isNew: boolean;
  private highlighted: boolean;

  constructor(
    private simpleModalService: SimpleModalService,
    @Inject('moment') private moment,
    private countdownService: CountdownService,
    private syncCountdownTimeService: SyncCountdownTimeService,
    private prismService: PrismService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private questionService: QuestionService,
    private toastrService: ToastrService,
    private location: Location,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
  }

  public canExit(): boolean {
    if (this.exam.finished) {
      return true;
    } else {
      const data = {
        title: 'Confirm',
        message: 'Do you wish to finish the current exam?'
      };
      const disposable = this.simpleModalService.addModal(ConfirmComponent, data).subscribe(isConfirmed => {
        if (isConfirmed) {
          this.finishExam();
          return true;
        } else {
          return false;
        }
      });

      // We can close modal calling disposable.unsubscribe();
      // If modal was not closed manually close it by timeout
      setTimeout(() => disposable.unsubscribe(), 10000);
    }
  }

  ngOnInit(): void {
    const $this = this;
    this.exam = new Exam();
    this.subscriptions.push(this.localStorageService.getAppConfig().subscribe(
      config => $this.exam.setMax(config.counter),
      error => console.log(error)
    ));

    const startTime = this.moment(this.exam.startAt);
    const endTime = this.moment(startTime).add(5400, 'seconds');

    // first subscriber subscribes
    this.subscriptions.push(this.countdownService.countdown().subscribe(
      (seconds: number) => {
        if (seconds === 3600) {
          $this.toastrService.success('You have another hour to finish the exam', 'Time left');
        }
        if (seconds === 1800) {
          $this.toastrService.success('You have another 30 minutes to finish the exam', 'Time left');
        }
        if (seconds === 600) {
          $this.toastrService.success('You have another 10 minutes to finish the exam', 'Time left');
        }
        if (seconds === 300) {
          $this.toastrService.success('You have less than 5 minutes to finish the exam', 'Times left!');
        }

        const obj = $this.syncCountdownTimeService.getValue();
        obj.time = $this.getTimeString(endTime);
        $this.syncCountdownTimeService.setValue(obj);
      },
      error => console.log(error),
      () => this.finishExam()
    ));

    // countdown is started
    this.countdownService.start(5400);

    this.toastrService.success('You have 90 minutes to finish your exam. Good luck!', 'Exam simulation start!');
  }

  ngAfterViewChecked() {
    if (this.isNew && !this.highlighted) {
      this.prismService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    if (this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
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

  public getQuestion(id, index) {
    this.reset();
    const $this = this;
    this.index = index;

    if (this.exam.questions[index] === undefined) {
      this.subscription = this.questionService.getOneQuestionById(id).subscribe(
        (question: IQuestion) => {
          const currentQuestion = {
            id: id,
            question: question,
            markForReview: false,
            correct: false
          } as IExamQuestion;
          $this.exam.setQuestion(index, currentQuestion);
          $this.setCurrentQuestion(currentQuestion);
        },
        error => console.log(error),
      );
    } else {
      this.setCurrentQuestion(this.exam.questions[index]);
    }
  }

  private validateCurrentExamQuestion() {
    if (this.examQuestion !== undefined) {
      this.examQuestion.correct = this.examQuestion.question.validate(false);
    }
  }

  private setCurrentQuestion(question: IExamQuestion) {
    this.examQuestion = question;
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
    this.validateCurrentExamQuestion();
    this.ngxUiLoaderService.start();
    this.isNew = false;
    this.highlighted = false;
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
    this.validateCurrentExamQuestion();
    this.exam.finish();
    const $this = this;
    let result;
    if (this.exam.score >= 50) {
      const message = 'Congratulations you passed the exam!';
      result = this.toastrService.success(message, 'Exam result!', {closeButton: true});
    } else {
      const message = 'You did not passed the exam!';
      result = this.toastrService.warning(message, 'Exam result!', {closeButton: true});
    }

    result.onHidden.subscribe(
      () => $this.goToHome(),
      error => console.log(error),
      () => console.log(`You answered correctly to ${$this.exam.score} questions from 70`)
    );
  }
}
