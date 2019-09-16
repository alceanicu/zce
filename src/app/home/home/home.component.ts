import { Component } from '@angular/core';

import { PdfService } from '../../core/services/pdf/pdf.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    public pdfService: PdfService
  ) {
  }
}
