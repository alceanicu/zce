import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamGuard } from '../core/';
import { ExamComponent } from '@app/exam/exam.component';

const routes: Routes = [
  {path: '', component: ExamComponent, canDeactivate: [ExamGuard], data: {title: 'ZCE - Exam'}},
  {path: '**', redirectTo: '/home', data: {title: 'ZCE'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule {
}
