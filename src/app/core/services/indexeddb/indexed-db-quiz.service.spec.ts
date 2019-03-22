import { TestBed } from '@angular/core/testing';
import {IndexedDbQuizService} from './indexed-db-quiz.service';

describe('IndexedDbQuizService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndexedDbQuizService = TestBed.get(IndexedDbQuizService);
    expect(service).toBeTruthy();
  });
});
