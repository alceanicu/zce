import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: 'ZCE'}},
  {path: '**', redirectTo: '/page-not-found', data: {title: 'ZCE - Page not found!'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule {
}
