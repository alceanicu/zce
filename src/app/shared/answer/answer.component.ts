import { Component, Input, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { IAnswerRow } from '../../core';

@Component({
  selector: 'app-answer,[app-answer]',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input('answerRow') answerRow: IAnswerRow;
  @Input('disabled') disabled: boolean;
  @Input('i') i: number;
  public extensionsAllowed: Array<string>;
  public letters: Array<string>;

  ngOnInit(): void {
    this.extensionsAllowed = environment.configPHP.extensionsAllowed;
    this.letters = environment.configPHP.letters;
  }
}
