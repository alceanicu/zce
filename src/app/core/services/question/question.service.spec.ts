import {async, TestBed} from '@angular/core/testing';
import {QuestionService} from '@app/core';
import {HomeComponent} from '@app/home/home/home.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '@env/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import * as moment from 'moment';

describe('QuestionService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [
        {provide: 'moment', useFactory: (): any => moment},
      ],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: QuestionService = TestBed.get(QuestionService);
    expect(service).toBeTruthy();
  });
});
