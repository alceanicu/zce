import { Component, Input, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';
import { IQuestionRow } from '../../core/interfaces';

@Component({
  selector: 'app-question,[app-question]',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input('questionRow') questionRow: IQuestionRow;
  public extensionsAllowed: Array<string>;

  ngOnInit(): void {
    this.extensionsAllowed = environment.configPHP.extensionsAllowed;
  }
}
