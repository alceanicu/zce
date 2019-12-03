import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { SimpleModalModule } from 'ngx-simple-modal';
import { ConfirmComponent } from './confirm/confirm.component';
import { QuestionDisplayComponent } from '@app/question-display/question-display.component';

@NgModule({
  declarations: [
    ConfirmComponent,
    QuestionDisplayComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxUiLoaderModule.forRoot({
      bgsColor: '#00ACC1',
      bgsOpacity: 0.5,
      bgsPosition: 'center-center',
      bgsSize: 60,
      bgsType: 'rectangle-bounce-pulse-out',
      blur: 5,
      fgsColor: '#bc75ea',
      fgsPosition: 'center-center',
      fgsSize: 100,
      fgsType: 'cube-grid',
      gap: 24,
      logoPosition: 'center-center',
      logoSize: 120,
      logoUrl: '',
      masterLoaderId: 'master',
      overlayBorderRadius: '0',
      overlayColor: 'rgba(40, 40, 40, 0.8)',
      pbColor: '#00ACC1',
      pbDirection: 'ltr',
      pbThickness: 3,
      hasProgressBar: true,
      text: 'loading ...',
      textColor: '#FFFFFF',
      textPosition: 'center-center'
    }),
    SimpleModalModule.forRoot({container: document.body}),
  ],
  entryComponents: [
    ConfirmComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    NgxUiLoaderModule,
    ConfirmComponent,
    QuestionDisplayComponent
  ]
})
export class SharedModule {
}
