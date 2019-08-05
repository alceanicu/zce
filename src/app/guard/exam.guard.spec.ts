import { TestBed, async, inject } from '@angular/core/testing';

import { ExamGuard } from './exam.guard';

describe('ExamGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamGuard]
    });
  });

  it('should ...', inject([ExamGuard], (guard: ExamGuard) => {
    expect(guard).toBeTruthy();
  }));
});
