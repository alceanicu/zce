import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  public version: string = '';

  ngOnInit(): void {
    this.version = environment.appVersion;
  }
}
