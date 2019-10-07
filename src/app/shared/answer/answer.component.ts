import { Component, Input, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { IAnswerRow } from '@app/core/interfaces';

@Component({
  selector: 'app-answer,[app-answer]',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  @Input() answerRow: IAnswerRow;
  @Input() disabled: boolean;
  @Input() i: number;
  public extensionsAllowed: Array<string>;
  public letters: Array<string>;

  ngOnInit(): void {
    this.extensionsAllowed = environment.configPHP.extensionsAllowed;
    this.letters = environment.configPHP.letters;
  }
}
