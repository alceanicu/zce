import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PhpListComponent} from './php-list/php-list.component';
import {PhpEditComponent} from './php-edit/php-edit.component';


const routes: Routes = [
  {path: '', component: PhpListComponent},
  {path: 'php-list', component: PhpListComponent},
  {path: 'php-edit', component: PhpEditComponent},
  {path: 'php-edit/:id', component: PhpEditComponent},
  {path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule { }
