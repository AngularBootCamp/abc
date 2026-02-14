import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, concatMap, EMPTY, map, of } from 'rxjs';

// import {authorInitActions, authorApiActions} from './author.actions';

@Injectable()
export class AuthorEffects {
  // loadAuthors$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(authorInitActions.loadAuthors),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => authorApiActions.loadAuthorsSuccess({ data })),
  //         catchError(error => of(authorApiActions.loadAuthorsFailure({ error }))))
  //     )
  //   );
  // });
  // constructor(private actions$: Actions) {}
}
