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
