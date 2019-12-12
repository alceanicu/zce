import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrepareRoutingModule } from './prepare-routing.module';
import { PrepareComponent } from './prepare/prepare.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PrepareRoutingModule
  ],
  declarations: [PrepareComponent]
})
export class PrepareModule {
}
