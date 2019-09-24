import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { ICountdownTime, IScore } from '../../../core/interfaces';
import { SyncCountdownTimeService, SyncLocationService, SyncScoreService } from '../../../core/services';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private html: any;
  private toggleButton: any;
  private sidebarVisible: boolean;
  private subscriptions: Subscription[] = [];
  public currentRoute: string;
  public scoreObj: IScore;
  public countdownTimeObj: ICountdownTime;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private element: ElementRef,
    private syncScoreService: SyncScoreService,
    private syncLocationService: SyncLocationService,
    private syncCountdownTimeService: SyncCountdownTimeService
  ) {
  }

  ngOnInit(): void {
    this.sidebarVisible = false;

    this.subscriptions.push(this.syncScoreService.currentValue.subscribe(value => {
      this.scoreObj = value;
    }));
    this.subscriptions.push(this.syncCountdownTimeService.currentValue.subscribe(value => {
      this.countdownTimeObj = value;
    }));
    this.subscriptions.push(this.syncLocationService.currentValue.subscribe(value => {
      this.currentRoute = value;
    }));

    this.html = this.document.getElementsByTagName('html')[0];
    this.toggleButton = this.element.nativeElement.getElementsByClassName('navbar-toggler')[0];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  sidebarOpen() {
    setTimeout(() => {
      this.toggleButton.classList.add('toggled'); // fixme
    }, 3500);
    this.html.classList.add('nav-open');
    this.sidebarVisible = true;
  }

  sidebarClose() {
    this.toggleButton.classList.remove('toggled'); // fixme
    this.sidebarVisible = false;
    this.html.classList.remove('nav-open');
  }

  sidebarToggle() {
    (this.sidebarVisible === false) ? this.sidebarOpen() : this.sidebarClose();
  }
}
