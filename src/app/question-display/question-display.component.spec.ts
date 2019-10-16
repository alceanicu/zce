import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDisplayComponent } from './question-display.component';

describe('QuestionDisplayComponent', () => {
  let component: QuestionDisplayComponent;
  let fixture: ComponentFixture<QuestionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
