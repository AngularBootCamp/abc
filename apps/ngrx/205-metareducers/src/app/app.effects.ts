/* eslint-disable @angular-eslint/use-injectable-provided-in
-- Effect injectables are handled by NgRx
*/
import { Injectable, inject } from '@angular/core';

import { filter, map } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { appActions, appApiActions } from './app.actions';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);

  clear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.clearState),
      filter(() =>
        window.confirm('Are you sure you want to delete all state?'),
      ),
      map(() => appApiActions.clearStateSuccess()),
    ),
  );
}
