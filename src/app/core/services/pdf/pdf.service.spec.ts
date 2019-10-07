import { async, TestBed } from '@angular/core/testing';

import { PdfService } from './pdf.service';
import { HomeComponent } from '../../../home/home/home.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '@env/environment';
import { ROUND_PROGRESS_DEFAULTS } from 'angular-svg-round-progressbar';
import * as moment from 'moment';

describe('PdfService', () => {
  let service: PdfService;

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

    service = TestBed.get(PdfService);
  }));

  it('should be created', async () => {
    await expect(service).toBeTruthy();
  });
});
