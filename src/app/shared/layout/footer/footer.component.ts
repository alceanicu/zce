import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  public today: number = Date.now();

  constructor(
    public location: Location
  ) {
  }

  ngOnInit() {
  }

  isAbout() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    return (titlee === '/about');
  }

  isExam() {
    const titlee = this.location.prepareExternalUrl(this.location.path());
    return (titlee === '/exam');
  }
}
