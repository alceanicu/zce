import {Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Exam} from '../../core/models/exam.model';
import {DataShareService, PrismService, QuestionService} from '../../core/services';
import {IQuestion} from '../../core/models';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  private currentExam: Exam;
  public question: IQuestion;

  constructor(
    private prismService: PrismService,
    private ngxLoader: NgxUiLoaderService,
    private sync: DataShareService,
    private questionService: QuestionService,
  ) {
  }

  ngOnInit() {
    this.startExam();
  }

  private startExam() {
    console.log('START EXAM');
    this.currentExam = new Exam();
    console.log(this.currentExam);
  }

  public endExam() {
    this.currentExam.finishExam();
    console.log('END EXAM');
  }

  get questionsArray() {
    return this.currentExam.questionsArray;
  }

  public getQuestion(id) {
    const $this = this;
    this.questionService.getOneQuestionById(id).subscribe((question) => {
      $this.question = question;
    });
  }
}
