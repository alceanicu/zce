import { TestBed } from '@angular/core/testing';
import { IndexedDbQuizService } from './indexed-db-quiz.service';
import { Extension, PhpAnswerType, PhpCategory, PhpQuestionDifficulty } from '@app/core/enum/config';

const question = {
  id: 999,
  category: [+PhpCategory.PHP_BASICS],
  difficulty: +PhpQuestionDifficulty.MEDIUM,
  type: +PhpAnswerType.CHECKBOX,
  finalAnswer: false,
  questionRows: [{text: '', language: +Extension.PHP}],
  answerRows: [{
    text: '',
    language: +Extension.PHP,
    correct: true,
    userAnswer: false,
    value: 1
  }],
  value: 1
};

describe('LocalService', () => {
  let service: IndexedDbQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IndexedDbQuizService],
    });

    service = TestBed.get(IndexedDbQuizService); // * inject service instance
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
