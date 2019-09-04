import {Component, ElementRef, Inject, OnInit, Renderer2, ViewChild} from '@angular/core';
import {DOCUMENT, Location} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';
import {HeaderComponent} from './shared/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public title = 'ZCE';
  private router$: Subscription;
  @ViewChild(HeaderComponent, {static: false}) headerComponent: HeaderComponent;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private element: ElementRef,
    private renderer: Renderer2,
    private location: Location,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.router$ = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (window.outerWidth > 991) {
          window.document.children[0].scrollTop = 0;
        } else {
          window.document.activeElement.scrollTop = 0;
        }
        this.headerComponent.sidebarClose();
      });

    const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
    this.renderer.listen('window', 'scroll', (event) => {
      const size = window.scrollY;
      if (size > 150 || window.pageYOffset > 150) {
        // add logic
        navbar.classList.remove('navbar-transparent');
      } else {
        // remove logic
        navbar.classList.add('navbar-transparent');
      }
    });

    const ua = window.navigator.userAgent;
    const trident = ua.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      const rv = ua.indexOf('rv:');
      const version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
      if (version) {
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('ie-background');
      }
    }
  }

  removeFooter() {
    const pageFromUrl = this.location.prepareExternalUrl(this.location.path());
    return ['/exam', '/zce/exam'].indexOf(pageFromUrl) === -1;
  }
}
