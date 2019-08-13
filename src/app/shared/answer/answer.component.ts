import {Component, Input} from '@angular/core';
import {IAnswerRow} from '../../core/models';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-answer,[app-answer]',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {
  @Input('answerRow') public answerRow: IAnswerRow;
  @Input('disabled') public disabled: boolean;
  @Input('i') public i: number;

  public letters = ['A', 'B', 'C', 'D'];
  public extensionsAllowed: Array<string>;

  constructor() {
    this.extensionsAllowed = environment.extensionsAllowed;
  }
}
