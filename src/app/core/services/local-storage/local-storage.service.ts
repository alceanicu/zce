import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage {
  /**
   * Returns the number of key/value pairs currently present in the list associated with the object.
   */
  readonly length: number;

  public constructor() {
    if (typeof (Storage) === 'undefined') {
      throw new Error('No web storage Support');
    }
  }

  /**
   * Add key and value to LocalStorage
   */
  public setItem(key: string, object: {}): void {
    window.localStorage.setItem(key, JSON.stringify(object));
  }

  /**
   * Retrieve a value by the key from LocalStorage
   */
  public getItem(key: string): string | null {
    return JSON.parse(window.localStorage.getItem(key));
  }

  /**
   * Remove an item by key from LocalStorage
   */
  public removeItem(key: string): void {
    window.localStorage.removeItem(key);
  }

  /**
   * Clear all LocalStorage
   */
  public clear(): void {
    window.localStorage.clear();
  }

  /**
   * Passed a number to retrieve nth key of a LocalStorage
   */
  key(index: number): string | null {
    return window.localStorage.key(index);
  }
}
