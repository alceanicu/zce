import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { DOCUMENT, Location } from '@angular/common';

import { ICountdownTime, IScore } from '../../../core/interfaces';
import { SyncCountdownTimeService, SyncScoreService } from '../../../core/services';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private html: any;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public scoreObj: IScore;
  public countdownTimeObj: ICountdownTime;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private location: Location,
    private element: ElementRef,
    private syncScoreService: SyncScoreService,
    private syncCountdownTimeService: SyncCountdownTimeService
  ) {
  }

  ngOnInit() {
    this.sidebarVisible = false;
    this.syncScoreService.currentValue.subscribe(value => {
      this.scoreObj = value;
    });
    this.syncCountdownTimeService.currentValue.subscribe(value => {
      this.countdownTimeObj = value;
    });
    this.html = this.document.getElementsByTagName('html')[0];
    this.toggleButton = this.element.nativeElement.getElementsByClassName('navbar-toggler')[0];
  }

  sidebarOpen() {
    const $this = this;
    setTimeout(() => {
      $this.toggleButton.classList.add('toggled');
    }, 500);
    this.html.classList.add('nav-open');
    this.sidebarVisible = true;
  }

  sidebarClose() {
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    this.html.classList.remove('nav-open');
  }

  sidebarToggle() {
    (this.sidebarVisible === false) ? this.sidebarOpen() : this.sidebarClose();
  }

  isPage(page: string): boolean {
    const pageFromUrl = this.location.prepareExternalUrl(this.location.path());
    return (pageFromUrl === page) || (pageFromUrl === ('/zce' + page));
  }
}
