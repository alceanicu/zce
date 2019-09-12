import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackendRoutingModule } from './backend-routing.module';
import { PhpListComponent } from './php-list/php-list.component';
import { PhpEditComponent } from './php-edit/php-edit.component';


@NgModule({
  declarations: [PhpListComponent, PhpEditComponent],
  imports: [
    CommonModule,
    BackendRoutingModule
  ]
})
export class BackendModule { }
