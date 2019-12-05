import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { IConfirm } from '@app/core/interfaces';
import { Logger } from '@app/core/services';

const log = new Logger('ConfirmComponent');

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmComponent extends SimpleModalComponent<IConfirm, boolean> implements IConfirm {
  public title: string;
  public message: string;

  constructor() {
    super();
  }

  confirm(): void {
    // we set modal result as true on click on confirm button,
    // then we can get modal result from caller code
    this.result = true;
    this.close().then(() => {
      log.info('Confirm closed');
    });
  }
}
