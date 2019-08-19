import {async, TestBed} from '@angular/core/testing';
import {PhpQuestionService} from './php-question.service';
import {HomeComponent} from '../../../home/home/home.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../../../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import * as moment from 'moment';
import {ROUND_PROGRESS_DEFAULTS} from 'angular-svg-round-progressbar';

describe('PhpQuestionService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [
        {provide: 'moment', useFactory: (): any => moment},
        {
          provide: ROUND_PROGRESS_DEFAULTS,
          useValue: {
            color: '#0F0',
            background: '#F00'
          }
        }],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: PhpQuestionService = TestBed.get(PhpQuestionService);
    expect(service).toBeTruthy();
  });
});
