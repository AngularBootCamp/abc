/* eslint-disable @angular-eslint/use-injectable-provided-in
-- Effect injectables are handled by NgRx
*/
import { Injectable, inject } from '@angular/core';

import { catchError, map, of, switchMap, tap } from 'rxjs';

import {
  Actions,
  OnInitEffects,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { WorkTask, WorkTaskLoader } from './work-task-loader.service';
import { workTaskActions } from './work-tasks.state';

function toTask(task: WorkTask) {
  return { label: task.title };
}

@Injectable()
export class WorkTasksEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly loader = inject(WorkTaskLoader);

  public readonly loadWorkTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(workTaskActions.loadWorkTasks),
      switchMap(() =>
        this.loader.getList().pipe(
          map(tasks =>
            workTaskActions.loadWorkTasksSuccess({
              tasks: {
                doneWork: tasks.slice(0, 4).map(toTask),
                todoWork: tasks.slice(4, 6).map(toTask),
              },
            }),
          ),
          catchError(error =>
            of(workTaskActions.loadWorkTasksFailure({ error })),
          ),
        ),
      ),
    ),
  );

  public readonly handleError = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(workTaskActions.loadWorkTasksFailure),
        tap(error => {
          console.error('Could not load work tasks', error);
          window.alert('Could not load work tasks');
        }),
      );
    },
    // since this effect doesn't dispatch a further action, we tell
    // NgRx not to re-dispatch the failure, which would otherwise
    // cause an infinite loop.
    { dispatch: false },
  );

  ngrxOnInitEffects(): Action {
    return workTaskActions.loadWorkTasks();
  }
}
