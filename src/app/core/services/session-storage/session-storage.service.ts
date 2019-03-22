import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService implements Storage {
  readonly length: number;

  constructor() {
    if (typeof (Storage) === 'undefined') {
      throw new Error('No web storage Support');
    }
  }

  /**
   * Empties the list associated with the object of all key/value pairs, if there are any.
   */
  clear(): void {
    window.sessionStorage.clear();
  }

  /**
   * value = storage[key]
   */
  getItem(key: string): any {
    return JSON.parse(window.sessionStorage.getItem(key));
  }

  /**
   * Returns the name of the nth key in the list, or null if n is greater
   * than or equal to the number of key/value pairs in the object.
   */
  key(index: number): string | null {
    return window.sessionStorage.key(index);
  }

  /**
   * delete storage[key]
   */
  removeItem(key: string): void {
    window.sessionStorage.removeItem(key);
  }

  /**
   * storage[key] = value
   */
  setItem(key: string, object: {}): void {
    window.sessionStorage.setItem(key, JSON.stringify(object));
  }

}
