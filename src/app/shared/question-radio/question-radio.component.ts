import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';

import {Observable} from 'rxjs';

import {Question} from '@app/core';
import {PhpAnswerLabel, PhpHighlightingLanguage} from '@app/core/enum/config';

@Component({
  selector: 'app-question-radio',
  templateUrl: './question-radio.component.html',
  styleUrls: ['./question-radio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionRadioComponent implements OnInit, AfterViewInit {
  @Input() public question: Question;
  @Input() public wasValidated$: Observable<boolean>;
  public PhpHighlightingLanguage = PhpHighlightingLanguage;
  public PhpAnswerLabel = PhpAnswerLabel;

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
