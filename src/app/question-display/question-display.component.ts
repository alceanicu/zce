import { Component, Input } from '@angular/core';
import { Question } from '@app/core';
import { AnswerOptions, Extension, PhpAnswerType } from '@app/core/enum/config';

@Component({
  selector: 'app-question-display,[app-question-display]',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss']
})
export class QuestionDisplayComponent {
  @Input() public question: Question;
  public PhpAnswerType = PhpAnswerType;
  public Extension = Extension;

  get extensions(): Array<string> {
    return Object.keys(Extension);
  }

  get options(): Array<string> {
    return Object.keys(AnswerOptions);
  }
}
