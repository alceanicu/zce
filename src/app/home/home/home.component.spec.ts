import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '@env/environment';
import { ROUND_PROGRESS_DEFAULTS } from 'angular-svg-round-progressbar';
import * as moment from 'moment';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AppComponent } from "@app/app.component";

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
        {provide: Router, useClass: RouterStub},
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
