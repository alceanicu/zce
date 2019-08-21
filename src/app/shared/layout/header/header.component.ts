import {Component, ElementRef, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {CountdownTimeSyncService, ScoreSyncService} from '../../../core/services';
import {ICountdownTime, IScore} from '../../../core/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  public scoreObj: IScore;
  public countdownTimeObj: ICountdownTime;

  constructor(
    private location: Location,
    private element: ElementRef,
    private scoreSyncService: ScoreSyncService,
    private countdownTimeSyncService: CountdownTimeSyncService
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.scoreSyncService.currentValue.subscribe(value => {
      this.scoreObj = value;
    });
    this.countdownTimeSyncService.currentValue.subscribe(value => {
      this.countdownTimeObj = value;
    });
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];

    setTimeout(() => {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');

    this.sidebarVisible = true;
  }

  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];

    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  isPage(page: string): boolean {
    const pageFromUrl = this.location.prepareExternalUrl(this.location.path());
    return (pageFromUrl === page) || (pageFromUrl === ('/zce' + page));
  }
}
