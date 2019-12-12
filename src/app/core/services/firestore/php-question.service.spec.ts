import { async, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhpQuestionService } from './php-question.service';
import { HomeComponent } from '../../../home/home/home.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import * as moment from 'moment';

describe('PhpQuestionService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
      ],
      providers: [
        {provide: 'moment', useFactory: (): any => moment},
      ],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: PhpQuestionService = TestBed.get(PhpQuestionService);
    expect(service).toBeTruthy();
  });
});
