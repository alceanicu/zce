import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { BackendRoutingModule } from './backend-routing.module';
import { PhpListComponent } from './php-list/php-list.component';
import { PhpEditComponent } from './php-edit/php-edit.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '@app/shared/shared.module';
import { AuthService } from '@app/backend/core/auth.service';
import { AuthGuard } from '@app/backend/core/auth.guard';

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
    // backend
    AngularFireAuthModule,
    //
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    BackendRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class BackendModule {
}
