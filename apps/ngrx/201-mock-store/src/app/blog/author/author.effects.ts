import { Injectable, inject } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  OnInitEffects
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, concatMap, map, of, tap } from 'rxjs';

import { AuthorLoaderService } from './author-loader.service';
import {
  authorApiActions,
  authorInitActions
} from './author.actions';

@Injectable()
export class AuthorEffects implements OnInitEffects {
  private actions$ = inject(Actions);
  private authorLoaderService = inject(AuthorLoaderService);

  loadAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authorInitActions.loadAuthors),
      concatMap(() =>
        this.authorLoaderService.load().pipe(
          map(authors =>
            authorApiActions.loadAuthorsSuccess({ authors })
          ),
          catchError(error =>
            of(authorApiActions.loadAuthorsFailure({ error }))
          )
        )
      )
    )
  );

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authorApiActions.loadAuthorsFailure),
        tap(({ type, error }) => {
          console.error('Error with', type, error);
        })
      ),
    { dispatch: false }
  );

  ngrxOnInitEffects(): Action {
    return authorInitActions.loadAuthors();
  }
}
