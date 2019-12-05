import { Observable } from 'rxjs';

export interface IDeactivate {
  canExit: () => Observable<boolean> | Promise<boolean> | boolean;
}
