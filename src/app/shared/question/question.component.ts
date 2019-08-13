import {Component, Input} from '@angular/core';
import {IQuestionRow} from '../../core/models';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-question,[app-question]',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent {
  @Input('questionRow') public  questionRow: IQuestionRow;
  public extensionsAllowed: Array<string>;

  constructor() {
    this.extensionsAllowed = environment.extensionsAllowed;
  }
}
