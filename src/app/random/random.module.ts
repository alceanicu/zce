import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RandomRoutingModule } from './random-routing.module';
import { RandomComponent } from './random/random.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    RandomRoutingModule,
    SharedModule,
  ],
  declarations: [
    RandomComponent,
  ]
})
export class RandomModule {
}
