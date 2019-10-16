import { Component, Input, OnInit } from '@angular/core';

import { Question } from '@app/core';
import { environment } from '@env/environment';


@Component({
  selector: 'app-question-display,[app-question-display]',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss']
})
export class QuestionDisplayComponent implements OnInit {
  @Input() public question: Question;

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
