import { async, TestBed } from '@angular/core/testing';
import { PdfService } from './pdf.service';
import * as moment from 'moment';

describe('PdfService', () => {
  let service: PdfService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: 'moment', useFactory: (): any => moment},
      ]
    }).compileComponents();

    service = TestBed.get(PdfService);
  }));

  it('should be created', async () => {
    await expect(service).toBeTruthy();
  });
});
