import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PdfRoutingModule} from './pdf-routing.module';
import {PdfTenComponent} from './pdf-ten/pdf-ten.component';

@NgModule({
  imports: [
    CommonModule,
    PdfRoutingModule
  ],
  declarations: [PdfTenComponent]
})
export class PdfModule {

}
