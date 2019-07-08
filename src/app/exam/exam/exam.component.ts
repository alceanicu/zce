import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {PrismService, QuestionService} from '../../core/services';
import {IExamQuestion, Exam} from '../../core/models';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, AfterViewChecked {
  private exam: Exam;
  public examQuestion?: IExamQuestion;
  public index?: number;
  public markForReviewArray = [];

  constructor(
    private prismService: PrismService,
    private ngxLoader: NgxUiLoaderService,
    private questionService: QuestionService,
  ) {
  }

  ngOnInit() {
    console.log('START EXAM');
    this.exam = new Exam();
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
      console.log('Get exam question for the first time');
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
      console.log('Load question again');
      this.examQuestion = this.exam.questions[index];
    }
    console.log(this.exam);
  }

  private updateExamScore() {
    console.log('update Exam Score');
    if (this.examQuestion !== undefined) {
      this.validateEachAnswerRows();
    }
  }

  validateEachAnswerRows() {
    let ok = true;
    this.examQuestion.question.answerRows.forEach((obj, key) => {
      ok = ok && (obj.correct === obj.userAnswer);
      console.log(obj);
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
    return (this.index === undefined) || (this.index <= 0);
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
    console.log(this.markForReviewArray);
  }

}
