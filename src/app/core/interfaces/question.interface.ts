import { IAnswerRow, IQuestionRow } from '.';

export interface IQuestion {
  id?: number;                          // ??? string
  type: string;                         // enum PhpQuestionType
  category: Array<number>;              // enum PhpQuestionCategory
  difficulty: string;                   // enum PhpQuestionDifficulty
  questionRows: Array<IQuestionRow>;
  answerRows: Array<IAnswerRow>;
  // virtual - fixme
  _isValidated?: boolean;
  _version?: string;

  validate(isValidated: boolean): boolean;
}
