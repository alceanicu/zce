import { Component, Input, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { IQuestionRow } from '@app/core/interfaces';

@Component({
  selector: 'app-question,[app-question]',
  templateUrl: './question.component.html'
})
export class QuestionComponent implements OnInit {
  @Input() questionRow: IQuestionRow;
  public extensionsAllowed: Array<string>;

  ngOnInit(): void {
    this.extensionsAllowed = environment.configPHP.extensionsAllowed;
  }
}
