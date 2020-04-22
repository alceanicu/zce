import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { ExamComponent } from '@app/exam/exam.component';

@NgModule({
  declarations: [ExamComponent],
  imports: [
    CommonModule,
    SharedModule,
    ExamRoutingModule
  ],
})
export class ExamModule {
}
