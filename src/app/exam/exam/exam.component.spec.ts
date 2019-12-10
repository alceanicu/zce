import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ExamComponent } from './exam.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '@env/environment';
import { ROUND_PROGRESS_DEFAULTS } from 'angular-svg-round-progressbar';
import * as moment from 'moment';
import { ToastrModule } from 'ngx-toastr';
import { Question } from '@app/core';
import { QuestionDisplayComponent } from '@app/question-display/question-display.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SimpleModalService } from 'ngx-simple-modal';
import { RouterTestingModule } from '@angular/router/testing';

describe('ExamComponent', () => {
  let component: ExamComponent;
  let fixture: ComponentFixture<ExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ExamComponent,
        QuestionDisplayComponent
      ],
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        NgxUiLoaderModule.forRoot({
          bgsColor: '#00ACC1',
          bgsOpacity: 0.5,
          bgsPosition: 'center-center',
          bgsSize: 60,
          bgsType: 'rectangle-bounce-pulse-out',
          blur: 5,
          fgsColor: '#bc75ea',
          fgsPosition: 'center-center',
          fgsSize: 100,
          fgsType: 'cube-grid',
          gap: 24,
          logoPosition: 'center-center',
          logoSize: 120,
          logoUrl: '',
          masterLoaderId: 'master',
          overlayBorderRadius: '0',
          overlayColor: 'rgba(40, 40, 40, 0.8)',
          pbColor: '#00ACC1',
          pbDirection: 'ltr',
          pbThickness: 3,
          hasProgressBar: true,
          text: 'loading ...',
          textColor: '#FFFFFF',
          textPosition: 'center-center'
        }),
        ToastrModule.forRoot({
          timeOut: 5000,
          preventDuplicates: true,
          newestOnTop: false,
          progressBar: true,
          maxOpened: 1
        }),
      ],
      providers: [
        SimpleModalService,
        {provide: 'moment', useFactory: (): any => moment},
        {
          provide: ROUND_PROGRESS_DEFAULTS,
          useValue: {
            color: '#0F0',
            background: '#F00'
          }
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamComponent);
    component = fixture.componentInstance;
    // @ts-ignore
    component.question = new Question();
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
