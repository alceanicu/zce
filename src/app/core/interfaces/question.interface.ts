import { IAnswerRow, IQuestionRow } from '.';

export interface IQuestion {
  id?: number;                          // ??? string
  type: string;                         // enum PhpQuestionType
  category: Array<number>;              // enum PhpQuestionCategory
  difficulty: string;                   // enum PhpQuestionDifficulty
  questionRows: Array<IQuestionRow>;
  answerRows: Array<IAnswerRow>;
  correctAnswerSum: number;
  // virtual - fixme
  _userAnswer?: number;
  _isValidated?: boolean;
  _version?: string;

  validate(isValidated: boolean): boolean;
}
