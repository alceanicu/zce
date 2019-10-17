import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhpListComponent } from './php-list/php-list.component';
import { PhpEditComponent } from './php-edit/php-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '@app/backend/core/auth.guard';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'php-list', component: PhpListComponent, canActivate: [AuthGuard]},
  {path: 'php-list/:page', component: PhpListComponent, canActivate: [AuthGuard]},
  {path: 'php-edit', component: PhpEditComponent, canActivate: [AuthGuard]},
  {path: 'php-edit/:id', component: PhpEditComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/page-not-found'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule {
}
