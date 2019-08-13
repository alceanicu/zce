import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {PhpQuestionService} from '..';
import {IConfig} from '../../models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements Storage {
  /**
   * Returns the number of key/value pairs currently present in the list associated with the
   * object.
   */
  readonly length: number;

  constructor(
    private firestorePhpQuestionService: PhpQuestionService
  ) {
    if (typeof (Storage) === 'undefined') {
      throw new Error('No web storage Support');
    }
  }

  getAppConfig(): Observable<any> {
    return new Observable((observer) => {
      let localStorageConfig = this.getItem('config') as IConfig | null;
      const now = new Date();
      if ((localStorageConfig === null) || (now.getDate() >= localStorageConfig.timestamp)) {
        this.setFreshAppConfigInLocalStorage(now).subscribe((freshConfig) => {
          localStorageConfig = freshConfig;
          observer.next(freshConfig);
        }, (error) => {
          observer.error(error);
        });
      } else {
        observer.next(localStorageConfig);
      }
    });
  }

  setFreshAppConfigInLocalStorage(now: Date): Observable<IConfig> {
    this.clear();
    return new Observable((observer) => {
      this.firestorePhpQuestionService.getConfig('php').subscribe(
        DocumentSnapshot => {
          // AppConfig will expire after 10 days
          now.setDate(now.getDate() + 10);
          const newAppConfig = {
            counter: DocumentSnapshot.data().counter,
            timestamp: now.getTime()
          } as IConfig;
          this.setItem('config', newAppConfig);
          observer.next(newAppConfig);
        },
        (error) => {
          observer.error(error);
        }
      );
    });
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
