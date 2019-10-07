export interface IAnswerRow {
  text: string;
  language?: number;
  correct: boolean;     // fixme - deprecated @ 3.0.0
  userAnswer?: boolean; // fixme - deprecated @ 3.0.0
  value: number;
}
