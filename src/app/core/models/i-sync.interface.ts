export interface IScore {
  total: number;
  correct: number;
  percentage: number;
}

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

export interface ICountdownTime {
  time: string;
}

export class CountdownTime implements ICountdownTime {
  time: string = '';

  constructor(values?: ICountdownTime) {
    if (values) {
      Object.assign(this, values);
    }
  }
}
