import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhpListComponent } from './php-list.component';

describe('PhpListComponent', () => {
  let component: PhpListComponent;
  let fixture: ComponentFixture<PhpListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhpListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
