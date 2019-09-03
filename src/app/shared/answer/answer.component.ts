import {Component, Input, OnInit} from '@angular/core';
import {IAnswerRow} from '../../core/models';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-answer,[app-answer]',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input('answerRow') answerRow: IAnswerRow;
  @Input('disabled') disabled: boolean;
  @Input('i') i: number;

  public letters: Array<string>;
  public extensionsAllowed: Array<string>;

  ngOnInit(): void {
    this.extensionsAllowed = environment.extensionsAllowed;
    this.letters = environment.letters;
  }
}
