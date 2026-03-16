/* eslint-disable @angular-eslint/use-injectable-provided-in
-- Effect injectables are handled by NgRx
*/
import { Injectable, inject } from '@angular/core';

import { catchError, map, of, switchMap } from 'rxjs';

import {
  Actions,
  OnInitEffects,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { EmployeeLoader } from './employee-loader.service';
import { employeesActions } from './employees.actions';

@Injectable()
export class EmployeesEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly loader = inject(EmployeeLoader);

  public readonly loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployees),
      switchMap(() =>
        this.loader.getList().pipe(
          map(employees =>
            employeesActions.loadEmployeesSuccess({
              employees: {
                currentEmployees: employees.slice(0, 4),
                newEmployees: employees.slice(4, 6),
              },
            }),
          ),
          catchError(error =>
            of(employeesActions.loadEmployeesFailure({ error })),
          ),
        ),
      ),
    ),
  );

  ngrxOnInitEffects(): Action {
    return employeesActions.loadEmployees();
  }
}
