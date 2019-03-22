import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ExamComponent} from './exam/exam.component';

const routes: Routes = [
  {path: '', component: ExamComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule {
}
