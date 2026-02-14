import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, mapTo } from 'rxjs';

import { appActions, appApiActions } from './app.actions';

@Injectable()
export class AppEffects {
  private actions$ = inject(Actions);

  clear$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.clearState),
      filter(() =>
        window.confirm('Are you sure you want to delete all state?')
      ),
      mapTo(appApiActions.clearStateSuccess())
    )
  );
}
