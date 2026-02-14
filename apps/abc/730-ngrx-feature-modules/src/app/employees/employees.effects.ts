import { Injectable, inject } from '@angular/core';
import {
  Actions,
  OnInitEffects,
  createEffect,
  ofType
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, catchError, map, switchMap } from 'rxjs';

import { EmployeeLoader } from './employee-loader.service';
import { employeesActions } from './employees.actions';

@Injectable()
export class EmployeesEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly loader = inject(EmployeeLoader);

  readonly loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEmployees),
      switchMap(() =>
        this.loader.getList().pipe(
          map(employees =>
            employeesActions.loadEmployeesSuccess({
              employees: {
                currentEmployees: employees.slice(0, 4),
                newEmployees: employees.slice(4, 6)
              }
            })
          ),
          catchError(error =>
            of(employeesActions.loadEmployeesFailure({ error }))
          )
        )
      )
    )
  );

  ngrxOnInitEffects(): Action {
    return employeesActions.loadEmployees();
  }
}
