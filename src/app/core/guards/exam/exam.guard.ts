import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { IDeactivate } from '@app/core/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ExamGuard implements CanDeactivate<IDeactivate> {
  public canDeactivate(
    component: IDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return component.canExit ? component.canExit() : true;
  }
}
