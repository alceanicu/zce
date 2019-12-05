import { Component, ElementRef, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';
import { ICountdownTime, IScore } from '@app/core/interfaces';
import { SyncCountdownTimeService, SyncLocationService, SyncScoreService } from '@app/core/services';
import { AuthService } from '@app/backend/core/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public currentRoute: string;
  public scoreObj: IScore;
  public countdownTimeObj: ICountdownTime;
  private html: any;
  private toggleButton: any;
  private sidebarVisible: boolean;
  private subscriptions: Subscription[] = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private element: ElementRef,
    private syncScoreService: SyncScoreService,
    private syncLocationService: SyncLocationService,
    private syncCountdownTimeService: SyncCountdownTimeService,
    private authService: AuthService
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

  sidebarOpen(): void {
    setTimeout(() => {
      this.toggleButton.classList.add('toggled'); // fixme
    }, 3500);
    this.html.classList.add('nav-open');
    this.sidebarVisible = true;
  }

  sidebarClose(): void {
    this.toggleButton.classList.remove('toggled'); // fixme
    this.sidebarVisible = false;
    this.html.classList.remove('nav-open');
  }

  sidebarToggle(): void {
    (this.sidebarVisible === false) ? this.sidebarOpen() : this.sidebarClose();
  }

  logout() {
    this.authService.logout();
  }
}
