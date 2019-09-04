import {IScore} from '../interfaces';

export class Score implements IScore {
  total: number = 0;
  correct: number = 0;
  percentage: number = 0;

  constructor(values?: IScore) {
    if (values) {
      Object.assign(this, values);
    }
  }
}
