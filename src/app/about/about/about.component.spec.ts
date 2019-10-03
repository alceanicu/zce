import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AboutComponent} from './about.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '@env/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AboutComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
