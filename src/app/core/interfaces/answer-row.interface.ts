/**
 * fixme
 */
export interface IAnswerRow {
  text: string;
  language: string;           // enum PhpHighlightingLanguage
  value: number;
  isCorrect: boolean;         // FIXME
  // FIXME
  _isCheckedByUser?: boolean;
}
