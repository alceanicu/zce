import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import * as moment from 'moment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent, HeaderComponent, SharedModule } from './shared';
import { CoreModule } from '@app/core';
import { environment } from '@env/environment';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '@app/backend/core/auth.service';
import { AuthGuard } from '@app/backend/core/auth.guard';


// export function initApp(phpQuestionService: PhpQuestionService) {
//   return (): Promise<any> => {
//     return new Promise((resolve) => {
//       phpQuestionService
//         .getPhpConfig()
//         .pipe(take(1))
//         .subscribe(
//           DocumentSnapshot => {
//             if (DocumentSnapshot.data().version !== environment.appVersion) {
//               // window.alert(`Please consider to upgrade this application to latest version!`);
//             }
//             resolve();
//           },
//           error => log.error(error),
//           () => log.info('App INIT')
//         );
//     });
//   };
// }

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
    BrowserAnimationsModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    SharedModule,
    AppRoutingModule // must be imported as the last module as it contains the fallback route
  ],
  providers: [
    AuthService,
    AuthGuard,
    {provide: 'moment', useFactory: (): any => moment}
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initApp,
    //   multi: true,
    //   deps: [PhpQuestionService]
    // },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
