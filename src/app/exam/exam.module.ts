import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExamRoutingModule} from './exam-routing.module';
import {ExamComponent} from './exam/exam.component';
import {SharedModule} from '../shared';

@NgModule({
  imports: [
    CommonModule,
    ExamRoutingModule,
    SharedModule
  ],
  declarations: [
    ExamComponent
  ],
})
export class ExamModule {
}
