import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamComponent } from './exam/exam.component';
import { ExamGuard } from '../core/';

const routes: Routes = [
  {path: '', component: ExamComponent, canDeactivate: [ExamGuard], data: {title: 'ZCE - Exam'}},
  {path: '**', redirectTo: '/home', data: {title: 'ZCE - Page not found!'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ExamComponent]
})
export class ExamRoutingModule {
}
