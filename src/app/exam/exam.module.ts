import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamRoutingModule } from './exam-routing.module';
import { ExamComponent } from './exam/exam.component';
import { SharedModule } from '../shared';
import { SimpleModalModule } from 'ngx-simple-modal';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SimpleModalModule.forRoot({container: document.body}),
    ExamRoutingModule
  ],
  declarations: [ExamComponent]
})
export class ExamModule {
}
