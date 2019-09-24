import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  version: string;

  ngOnInit(): void {
    this.version = environment.appVersion;
  }
}
