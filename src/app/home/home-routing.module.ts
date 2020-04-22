import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'ZCE - Home'}},
  {path: '**', redirectTo: '/home', data: {title: 'ZCE - Page not found!'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
