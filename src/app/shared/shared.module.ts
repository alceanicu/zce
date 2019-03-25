import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {QuestionComponent} from './question/question.component';
import {AnswerComponent} from './answer/answer.component';
import {NgxUiLoaderModule} from 'ngx-ui-loader';

@NgModule({
  declarations: [
    QuestionComponent,
    AnswerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
      textPosition: 'center-center',
      threshold: 500
    }),
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    QuestionComponent,
    AnswerComponent,
    NgxUiLoaderModule
  ]
})
export class SharedModule {
}
