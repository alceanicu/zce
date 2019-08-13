import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RandomComponent} from './random/random.component';

const routes: Routes = [
  {path: '', component: RandomComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RandomRoutingModule {
}
