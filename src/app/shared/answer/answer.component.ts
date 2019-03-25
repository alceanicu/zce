import {Component, OnInit, Input} from '@angular/core';
import {IAnswerRow} from '../../core/models';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-answer,[app-answer]',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input('answerRow') answerRow: IAnswerRow;
  @Input('disabled') disabled: boolean;
  @Input('i') i: number;

  letters = ['A', 'B', 'C', 'D'];
  extensionsAllowed: Array<string>;

  constructor() {
    this.extensionsAllowed = environment.extensionsAllowed;
  }

  ngOnInit() {
  }
}
