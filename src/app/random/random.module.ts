import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RandomRoutingModule} from './random-routing.module';
import {RandomComponent} from './random/random.component';

@NgModule({
  imports: [
    CommonModule,
    RandomRoutingModule
  ],
  declarations: [RandomComponent]
})
export class RandomModule {
}
