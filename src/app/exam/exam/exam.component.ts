import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {DataShareService, PrismService, QuestionService} from '../../core/services';
import {IExamQuestion, Exam} from '../../core/models';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit, AfterViewChecked {
  private exam: Exam;
  private examQuestion?: IExamQuestion;
  private index?: number;

  constructor(
    private prismService: PrismService,
    private ngxLoader: NgxUiLoaderService,
    private sync: DataShareService,
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
      'btn-warning': this.index !== index
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
        // question.answerRows.forEach((obj, key) => { // FIXME
        //   obj.userAnswer = false;
        // });
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

  public disabledPrev() {
    return (this.index === undefined) || (this.index <= 0);
  }

  public disabledNext() {
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
}
