import {Component, OnInit, AfterViewChecked} from '@angular/core';
import {PrismService} from '../../core/services';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent  implements OnInit, AfterViewChecked {

  constructor(
    private prismService: PrismService,
  ) {
  }

  ngAfterViewChecked() {
    this.prismService.highlightAll();
  }

  ngOnInit() {
  }

}
