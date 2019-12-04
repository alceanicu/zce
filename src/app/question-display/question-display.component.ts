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
  public AnswerOptions = AnswerOptions;
  public Extension = Extension;
  keys = Object.keys;
}
