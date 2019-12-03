import { Component, Input, OnInit } from '@angular/core';

import { Question } from '@app/core';
import { environment } from '@env/environment';
import { PhpAnswerType } from '@env/configPHP';

@Component({
  selector: 'app-question-display,[app-question-display]',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss']
})
export class QuestionDisplayComponent implements OnInit {
  @Input() public question: Question;
  public PhpAnswerType = PhpAnswerType;

  get extensionsAllowed(): Array<string> {
    return environment.configPHP.extensionsAllowed;
  }

  get letters(): Array<string> {
    return environment.configPHP.letters;
  }

  constructor() {
  }

  ngOnInit(): void {
  }
}
