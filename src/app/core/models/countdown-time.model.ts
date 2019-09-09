import { ICountdownTime } from '../interfaces';


export class CountdownTime implements ICountdownTime {
  time: string = '';

  constructor(values?: ICountdownTime) {
    if (values) {
      Object.assign(this, values);
    }
  }
}
