import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import {ROUND_PROGRESS_DEFAULTS, RoundProgressModule} from 'angular-svg-round-progressbar';
import {FooterComponent, HeaderComponent, SharedModule} from './shared';
import {CoreModule} from './core';
import {CountdownModule} from 'ngx-countdown';
import * as moment from 'moment';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CountdownModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    SharedModule,
    CoreModule,
    RoundProgressModule
  ],
  providers: [
    {provide: 'moment', useFactory: (): any => moment},
    {
      provide: ROUND_PROGRESS_DEFAULTS,
      useValue: {
        color: '#0F0',
        background: '#F00'
      }
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
