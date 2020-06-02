import { IAnswerRow, IQuestionRow } from '.';

export interface IQuestion {
  id?: number;                          // ??? string
  type: string;                         // enum PhpQuestionType
  category: Array<number>;              // enum PhpQuestionCategory
  difficulty: string;                   // enum PhpQuestionDifficulty
  questionRows: Array<IQuestionRow>;
  answerRows: Array<IAnswerRow>;
  // virtual
  _isValidated?: boolean;
  _version?: string;
  _userAnswer?: number;

  validate(isValidated: boolean): boolean;
}
