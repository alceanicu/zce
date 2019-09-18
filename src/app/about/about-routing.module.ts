import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {path: '', component: AboutComponent, data: {title: 'ZCE - About'}},
  {path: '**', redirectTo: '/page-not-found', data: {title: 'ZCE - Page not found!'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule {
}
