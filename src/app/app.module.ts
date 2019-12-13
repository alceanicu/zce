import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import * as moment from 'moment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import {CoreModule, Logger} from '@app/core';
import { environment } from '@env/environment';
import { IndexedDbQuizService } from '@app/core/services/indexeddb/indexed-db-quiz.service';

const log = new Logger('AppModule');

export function initApp(iDb: IndexedDbQuizService) {
  return (): Promise<any> => {
    return new Promise((resolve) => {
      iDb.clearQuestionTableByVersion()
        .then((deleteCount) => log.info(`Deleted ${deleteCount} ZCE OLD question`))
        .catch(e => log.error(e))
        .finally(() => resolve());
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
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    SharedModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [IndexedDbQuizService]
    },
    {provide: 'moment', useFactory: (): any => moment}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
