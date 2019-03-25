import {Component, OnInit, Input} from '@angular/core';
import {IQuestionRow} from '../../core/models';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-question,[app-question]',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input('questionRow') questionRow: IQuestionRow;
  private extensionsAllowed: Array<string>;

  constructor() {
    this.extensionsAllowed = environment.extensionsAllowed;
  }

  ngOnInit() {
  }
}
