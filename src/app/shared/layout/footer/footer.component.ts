import { Component, OnDestroy, OnInit } from '@angular/core';

import { SyncLocationService } from '@app/core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit, OnDestroy {
  public currentRoute: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private syncLocationService: SyncLocationService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.syncLocationService.currentValue.subscribe(value => {
      this.currentRoute = value;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
