import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrepareComponent } from './prepare/prepare.component';

const routes: Routes = [
  {path: '', component: PrepareComponent, data: {title: 'ZCE - Prepare'}},
  {path: '**', redirectTo: '/page-not-found', data: {title: 'ZCE - Page not found!'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrepareRoutingModule {
}
