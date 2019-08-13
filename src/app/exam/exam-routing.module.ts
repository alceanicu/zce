import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExamComponent} from './exam/exam.component';
import {ExamGuard} from '../guard/exam.guard';

const routes: Routes = [
  {
    path: '',
    component: ExamComponent,
    canDeactivate: [ExamGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ExamComponent],
})
export class ExamRoutingModule {
}
