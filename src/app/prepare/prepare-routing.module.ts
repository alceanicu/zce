import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrepareComponent } from './prepare.component';

const routes: Routes = [
  {path: '', component: PrepareComponent, data: {title: 'ZCE - prepare'}},
  {path: '**', redirectTo: '/home', data: {title: 'ZCE'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepareRoutingModule {
}
