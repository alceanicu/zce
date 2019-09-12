import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhpEditComponent } from './php-edit.component';

describe('PhpEditComponent', () => {
  let component: PhpEditComponent;
  let fixture: ComponentFixture<PhpEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhpEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
