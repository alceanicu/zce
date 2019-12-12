import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './home.component';
import { environment } from '@env/environment';
import * as moment from 'moment';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';

class RouterStub {
  getCurrentNavigation() {
    return {
      extras: {
        state: {
          score: 45,
        }
      }
    };
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        BrowserAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        ToastrModule.forRoot({
          timeOut: 5000,
          preventDuplicates: true,
          newestOnTop: false,
          progressBar: true,
          maxOpened: 1
        }),
      ],
      providers: [
        {provide: 'moment', useFactory: (): any => moment},
        {provide: Router, useClass: RouterStub},
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
