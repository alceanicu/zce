import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PdfTenComponent} from './pdf-ten/pdf-ten.component';

const routes: Routes = [
  {path: '', component: PdfTenComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PdfRoutingModule {
}
