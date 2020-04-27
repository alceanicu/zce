import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import { Subscription } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';

import { INavigation } from '@app/core/interfaces/navigation.interface';
import { Logger, SyncLocationService } from '@app/core';
import { environment } from '@env/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public title = 'zce';
  public currentRoute: string;
  public navigation: INavigation[] = [
    { url: 'home', label: 'Home', icon: 'home' },
    { url: 'prepare', label: 'Prepare', icon: 'audiotrack' },
    { url: 'exam', label: 'Exam', icon: 'school' },
    { url: 'about', label: 'About', icon: 'info' }
  ];
  private subscriptions: Subscription[] = [];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private syncLocationService: SyncLocationService
  ) {
    this.matIconRegistry.addSvgIcon(
      'elephant',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/elephant.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'github',
      this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/svg/github.svg')
    );
  }

  ngOnInit(): void {
    if (environment.production) {
      Logger.enableProductionMode();
    }

    this.subscriptions.push(this.syncLocationService.currentValue.subscribe(value => {
      this.currentRoute = value;
    }));

    // change title on active route chanced
    this.subscriptions.push(this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(data => {
      this.titleService.setTitle(data.title);
      this.syncLocationService.setValue(this.getCurrentUrl());
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private getCurrentUrl(): string {
    return this.location
      .prepareExternalUrl(this.location.path())
      .replace('#', '');
  }
}
