import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExamRoutingModule} from './exam-routing.module';
import {ExamComponent} from './exam/exam.component';

@NgModule({
  imports: [
    CommonModule,
    ExamRoutingModule
  ],
  declarations: [ExamComponent],
})
export class ExamModule {
}
