import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrepareComponent } from './prepare.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '@env/environment';
import * as moment from 'moment';
import { ToastrModule } from 'ngx-toastr';
import { Question } from '@app/core';
import { QuestionDisplayComponent } from '@app/shared/question-display/question-display.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

describe('PrepareComponent', () => {
  let component: PrepareComponent;
  let fixture: ComponentFixture<PrepareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PrepareComponent,
        QuestionDisplayComponent
      ],
      imports: [
        BrowserAnimationsModule,
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
        {provide: 'moment', useFactory: (): any => moment}
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrepareComponent);
    component = fixture.componentInstance;
    // @ts-ignore
    component.question = new Question();
    // component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
