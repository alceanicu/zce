import { ChangeDetectionStrategy, Component } from '@angular/core';
// @ts-ignore
import { version } from '../../../../package.json';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  public version: string = version;
}
