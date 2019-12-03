export const configPHP = {
  phpPath: 'phpQuestions',
  configPath: 'appConfig',
  max: 806,
  letters: ['A', 'B', 'C', 'D'],
  extensionsAllowed: ['json', 'php', 'none', 'sql', 'html', 'xml'],
  categoryOptions: [
    'PHP Basics',
    'OOP',
    'Security',

    'Functions',
    'Web Features',
    'Strings & Patterns',
    'Arrays',
    'Error Handling',

    'Databases & SQL',
    'Data Format & Types',
    'I/O'
  ],
  difficultyOptions: ['Easy', 'Medium', 'Hard'],
  typeOptions: ['Radio', 'Checkbox', 'Text'],
  correctOptions: [
    {value: true, text: 'YES'},
    {value: false, text: 'NO'}
  ],
  apiUrl: 'http://localhost/rest-api/'
};

export enum PhpAnswerType {
  CHECKBOX = '0',
  RADIO = '1',
  TEXT = '2'
}

export enum PhpQuestionDifficulty {
  EASY = '0',
  MEDIUM = '1',
  HARD = '2'
}

export enum AnswerOptions {
  A = '0',
  B = '1',
  C = '2',
  D = '3'
}

export enum PhpCategory {
  PHP_BASICS = '0',
  OOP = '1',
  SECURITY = '2',

  FUNCTIONS = '3',
  WEB_FEATURES = '4',
  STRINGS_PATTERNS = '5',
  ARRAYS = '6',
  ERROR_HANDLING = '7',

  DATABASES_SQL = '8',
  DATA_FORMAT_TYPES = '9',
  INPUT_OUTPUT = '10'
}
