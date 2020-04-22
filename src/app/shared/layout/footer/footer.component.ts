import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { SyncLocationService } from '@app/core/services';
import { INavigation } from '@app/core/interfaces/navigation.interface';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  @Input() public sidenav: any;
  @Input() public navigation: INavigation[];
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
