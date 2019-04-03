import {Component, OnInit} from '@angular/core';
import {Exam} from '../../core/models/exam.model';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  private currentExam: Exam;

  constructor() {
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
}
