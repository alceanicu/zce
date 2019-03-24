import { Component, OnInit, Input } from '@angular/core';
import { IQuestionRow } from '../../core/models';

@Component({
  selector: 'app-question,[app-question]',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input('questionRow') questionRow: IQuestionRow;
  public extensionsAllowed = ['php', 'sql'];

  constructor() {
  }

  ngOnInit() {
  }
}
