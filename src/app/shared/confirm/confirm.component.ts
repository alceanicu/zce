import {Component} from '@angular/core';

import {SimpleModalComponent} from 'ngx-simple-modal';
import {IConfirm} from '../../core/interfaces';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html'
})
export class ConfirmComponent extends SimpleModalComponent<IConfirm, boolean> implements IConfirm {
  title: string;
  message: string;

  constructor() {
    super();
  }

  confirm() {
    // we set modal result as true on click on confirm button,
    // then we can get modal result from caller code
    this.result = true;
    this.close().then(() => {
      // console.log('ok');
    });
  }
}
