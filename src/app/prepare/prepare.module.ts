import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrepareRoutingModule } from './prepare-routing.module';
import { PrepareComponent } from './prepare.component';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [PrepareComponent],
  imports: [
    CommonModule,
    SharedModule,
    PrepareRoutingModule
  ]
})
export class PrepareModule {
}
