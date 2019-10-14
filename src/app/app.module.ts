import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { CoreModule, Logger } from '@app/core';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '@env/environment';
import { ROUND_PROGRESS_DEFAULTS, RoundProgressModule } from 'angular-svg-round-progressbar';
import * as moment from 'moment';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { IndexedDbQuizService } from '@app/core/services/indexeddb/indexed-db-quiz.service';
import { AuthService } from '@app/backend/core/auth.service';
import { AuthGuard } from '@app/backend/core/auth.guard';

const log = new Logger('AppModule');

export function initApp(indexedDbQuizService: IndexedDbQuizService) {
  return (): Promise<any> => { // fixme
    // log.info('In initApp');
    // return indexedDbQuizService.clearQuestionTable();
    return new Promise((resolve) => {
      setTimeout(() => {
        log.info('In initApp');
        resolve();
      }, 50);
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    NgbModule,
    NgbPaginationModule,
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule,
    CoreModule,
    RoundProgressModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
      newestOnTop: false,
      progressBar: true,
      maxOpened: 1
    }),
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  providers: [
    AuthService,
    AuthGuard,
    {provide: 'moment', useFactory: (): any => moment},
    {
      provide: ROUND_PROGRESS_DEFAULTS,
      useValue: {
        color: '#0F0',
        background: '#F00'
      }
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [IndexedDbQuizService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
