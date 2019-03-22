import { TestBed } from '@angular/core/testing';

import { PhpQuestionService } from './php-question.service';

describe('PhpQuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhpQuestionService = TestBed.get(PhpQuestionService);
    expect(service).toBeTruthy();
  });
});
