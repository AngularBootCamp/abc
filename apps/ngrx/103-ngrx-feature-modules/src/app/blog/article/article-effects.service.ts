import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { catchError, concatMap, EMPTY, of, map } from 'rxjs';

// import {articleActions} from './article.actions';

@Injectable()
export class ArticleEffects {
  // loadArticles$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(articleActions.loadArticles),
  //     concatMap(() =>
  //       /** An EMPTY observable only emits completion. Replace with your own observable API request */
  //       EMPTY.pipe(
  //         map(data => articleActions.loadArticlesSuccess({ data })),
  //         catchError(error => of(articleActions.loadArticlesFailure({ error }))))
  //     )
  //   );
  // });
  // constructor(private actions$: Actions) {}
}
