export enum PhpQuestionType {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
  TEXT = 'text'
}

export enum PhpQuestionCategory {
  PHP_BASICS,
  OOP,
  SECURITY,

  FUNCTIONS,
  WEB_FEATURES,
  STRINGS_PATTERNS,
  ARRAYS,
  ERROR_HANDLING,

  DATABASES_SQL,
  DATA_FORMAT_TYPES,
  INPUT_OUTPUT
}

export enum PhpQuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export enum PhpAnswerLabel {
  A,
  B,
  C,
  D
}

export enum PhpHighlightingLanguage {
  NONE = 'none',
  PHP = 'php',
  SQL = 'sql',
  XML = 'xml',
  JSON = 'json',
  HTML = 'html'
}
