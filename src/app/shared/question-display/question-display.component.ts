import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { PhpAnswerLabel, PhpHighlightingLanguage, PhpQuestionType } from '@app/core/enum/config';
import { Question } from '@app/core';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionDisplayComponent implements OnInit, AfterViewInit {
  @Input() public question: Question;
  @Input() public wasValidated$: Observable<boolean>;
  public PhpHighlightingLanguage = PhpHighlightingLanguage;
  public PhpAnswerLabel = PhpAnswerLabel;
  public PhpQuestionType = PhpQuestionType;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.wasValidated$.subscribe(value => {
      if (value) {
        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
