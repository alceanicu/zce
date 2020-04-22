import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit, AfterViewInit {
  public version: string = '';

  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.version = environment.appVersion;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
