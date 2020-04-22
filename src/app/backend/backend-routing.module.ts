import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhpEditComponent } from '@app/backend/php-edit/php-edit.component';
import { LoginComponent } from '@app/backend/login/login.component';
import { PhpListComponent } from '@app/backend/php-list/php-list.component';
import { AuthGuard } from '@app/backend/core/auth.guard';
import { HomeComponent } from '@app/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'php-list', component: PhpListComponent, canActivate: [AuthGuard] },
  { path: 'php-list/:page', component: PhpListComponent, canActivate: [AuthGuard] },
  { path: 'php-edit', component: PhpEditComponent, canActivate: [AuthGuard] },
  { path: 'php-edit/:id', component: PhpEditComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackendRoutingModule {
}
