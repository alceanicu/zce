import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { Question } from '@app/core';
import { PhpHighlightingLanguage } from '@app/core/enum/config';

@Component({
  selector: 'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls: ['./question-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionDisplayComponent implements OnInit, AfterViewInit {
  @Input() public question: Question;
  public PhpHighlightingLanguage = PhpHighlightingLanguage;

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
