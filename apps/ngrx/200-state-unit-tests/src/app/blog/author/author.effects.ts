/* eslint-disable @angular-eslint/use-injectable-provided-in
-- Effect injectables are handled by NgRx
*/
import { Injectable, inject } from '@angular/core';

import { catchError, concatMap, map, of, tap } from 'rxjs';

import {
  Actions,
  OnInitEffects,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { AuthorLoaderService } from './author-loader.service';
import { authorApiActions, authorInitActions } from './author.actions';

@Injectable()
export class AuthorEffects implements OnInitEffects {
  private actions$ = inject(Actions);
  private authorLoaderService = inject(AuthorLoaderService);

  loadAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorInitActions.loadAuthors),
      concatMap(() =>
        this.authorLoaderService.load().pipe(
          map(authors => authorApiActions.loadAuthorsSuccess({ authors })),
          catchError(error =>
            of(authorApiActions.loadAuthorsFailure({ error })),
          ),
        ),
      ),
    ),
  );

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authorApiActions.loadAuthorsFailure),
        tap(({ type, error }) => {
          console.error('Error with', type, error);
        }),
      ),
    { dispatch: false },
  );

  ngrxOnInitEffects(): Action {
    return authorInitActions.loadAuthors();
  }
}
