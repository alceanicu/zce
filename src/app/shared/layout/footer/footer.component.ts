import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  public today: number = Date.now();

  constructor(private location: Location) {
  }

  isPage(page: string): boolean {
    const pageFromUrl = this.location.prepareExternalUrl(this.location.path());
    return (pageFromUrl === page) || (pageFromUrl === ('/zce' + page));
  }
}
