import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import * as moment from 'moment';

import { AppComponent } from '@app/app.component';
import { AppRoutingModule } from '@app/app-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { environment } from '@env/environment';
import { HeaderComponent } from '@app/shared/layout/header/header.component';
import { FooterComponent } from '@app/shared/layout/footer/footer.component';
import { IndexedDbQuizService } from '@app/core/services/indexeddb/indexed-db-quiz.service';
import { Logger } from '@app/core';

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
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    //
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    //
    SharedModule,
    //
    AppRoutingModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      multi: true,
      deps: [IndexedDbQuizService]
    },
    {
      provide: 'moment',
      useFactory: (): any => moment
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
