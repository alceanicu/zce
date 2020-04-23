import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { ICountdownTime, IScore } from '@app/core/interfaces';
import { SyncCountdownTimeService, SyncLocationService, SyncScoreService } from '@app/core/services';
import { INavigation } from '@app/core/interfaces/navigation.interface';
import { AuthService } from '@app/backend/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() public sidenav: any;
  @Input() public navigation: INavigation[];
  public currentRoute: string;
  public scoreObj: IScore;
  public countdownTimeObj: ICountdownTime;
  private subscriptions: Subscription[] = [];

  constructor(
    private syncScoreService: SyncScoreService,
    private syncLocationService: SyncLocationService,
    private syncCountdownTimeService: SyncCountdownTimeService,
    public auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.syncScoreService.currentValue.subscribe(value => {
      this.scoreObj = value;
    }));
    this.subscriptions.push(this.syncLocationService.currentValue.subscribe(value => {
      this.currentRoute = value;
    }));
    this.subscriptions.push(this.syncCountdownTimeService.currentValue.subscribe(value => {
      this.countdownTimeObj = value;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
