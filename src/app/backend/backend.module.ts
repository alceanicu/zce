import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BackendRoutingModule } from './backend-routing.module';
import { PhpListComponent } from './php-list/php-list.component';
import { PhpEditComponent } from './php-edit/php-edit.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    PhpListComponent,
    PhpEditComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BackendRoutingModule,
  ]
})
export class BackendModule {
}
