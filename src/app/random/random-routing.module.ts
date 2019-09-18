import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RandomComponent } from './random/random.component';

const routes: Routes = [
  {path: '', component: RandomComponent, data: {title: 'ZCE - Prepare'}},
  {path: '**', redirectTo: '/page-not-found', data: {title: 'ZCE - Page not found!'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomRoutingModule {
}
