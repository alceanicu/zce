import {Component, OnInit, ElementRef} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {DataShareService} from '../../../core/services';
import {DataShareCountdownService} from '../../../core/services/data-share-countdown/data-share-countdown.service';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private toggleButton: any;
  private sidebarVisible: boolean;
  public message: any;
  public timeString: any;

  constructor(
    public location: Location,
    private element: ElementRef,
    private data: DataShareService,
    private dataTime: DataShareCountdownService,
    private router: Router
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.dataTime.currentCountdownTime.subscribe(message => {
      this.timeString = message;
    });
    this.data.currentScore.subscribe(message => {
      this.message = message;
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

  onFinished() { // FIXME
    let msg = 'Times up!\n';
    msg += '[This section of the app is not finished yet, so we can offer to you your exam result.\nIn next release will be fixed 😉]\n';
    alert(msg);
    this.router.navigateByUrl('home');
  }

  isHome() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    return (titlee === '/home');
  }

  isAbout() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    return (titlee === '/about');
  }

  isExam() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    return (titlee === '/exam');
  }

  isRandom() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    return (titlee === '/random');
  }
}
