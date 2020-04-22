import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { Logger, Question } from '@app/core';
import { PhpHighlightingLanguage, PhpQuestionType } from '@app/core/enum/config';

const log = new Logger('QuestionDisplayComponent');

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionDisplayComponent implements OnInit, AfterViewInit {
  @Input() public question: Question;
  public PhpHighlightingLanguage = PhpHighlightingLanguage;
  public PhpQuestionType = PhpQuestionType;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    // this.userAnswer = 0;
    // log.info('on ngOnInit');
  }

  ngAfterViewInit(): void {
    // log.info('on ngAfterViewInit');
    this.cdr.detectChanges();
  }
}
