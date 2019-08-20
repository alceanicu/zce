import {Component, Input} from '@angular/core';
import {IAnswerRow} from '../../core/models';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-answer,[app-answer]',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent {
  @Input('answerRow') answerRow: IAnswerRow;
  @Input('disabled') disabled: boolean;
  @Input('i') i: number;

  public letters: Array<string>;
  public extensionsAllowed: Array<string>;

  constructor() {
    this.extensionsAllowed = environment.extensionsAllowed;
    this.letters = environment.letters;
  }
}
