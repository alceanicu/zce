import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDisplayComponent } from './question-display.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '@env/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { Question } from '@app/core';

describe('QuestionDisplayComponent', () => {
  let component: QuestionDisplayComponent;
  let fixture: ComponentFixture<QuestionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionDisplayComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDisplayComponent);
    component = fixture.componentInstance;
    component.question = new Question();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
