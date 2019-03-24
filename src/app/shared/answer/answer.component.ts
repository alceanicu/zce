import {Component, OnInit, Input} from '@angular/core';
import { IAnswerRow } from '../../core/models';

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

  constructor() {
  }

  ngOnInit() {
  }
}
