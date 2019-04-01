import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfTenComponent } from './pdf-ten.component';

describe('PdfTenComponent', () => {
  let component: PdfTenComponent;
  let fixture: ComponentFixture<PdfTenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfTenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
