import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  public today: number = Date.now();
  constructor() { }

  ngOnInit() {
  }

}
