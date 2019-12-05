import { Injectable } from '@angular/core';
import { PhpQuestionService } from '@app/core/services/firestore/php-question.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage {
  /**
   * Returns the number of key/value pairs currently present in the list associated with the object.
   */
  readonly length: number;

  constructor(
    private firestorePhpQuestionService: PhpQuestionService
  ) {
    if (typeof (Storage) === 'undefined') {
      throw new Error('No web storage Support');
    }
  }

  /**
   * Add key and value to LocalStorage
   */
  setItem(key: string, object: {}) {
    window.localStorage.setItem(key, JSON.stringify(object));
  }

  /**
   * Retrieve a value by the key from LocalStorage
   */
  getItem(key: string): any {
    return JSON.parse(window.localStorage.getItem(key));
  }

  /**
   * Remove an item by key from LocalStorage
   */
  removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }

  /**
   * Clear all LocalStorage
   */
  clear(): void {
    window.localStorage.clear();
  }

  /**
   * Passed a number to retrieve nth key of a LocalStorage
   */
  key(index: number): string | null {
    return window.localStorage.key(index);
  }
}
