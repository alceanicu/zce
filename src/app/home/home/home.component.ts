import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PdfService } from '@app/core/services/pdf/pdf.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(
    public pdfService: PdfService
  ) {
  }
}
