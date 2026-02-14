import { Injectable, inject } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  OnInitEffects
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, concatMap, map, of, tap } from 'rxjs';

import { ArticleLoaderService } from '../article-list/article-loader.service';

import {
  articleApiActions,
  articleInitActions,
  articleListPageActions,
  articlePageActions
} from './article.actions';

@Injectable()
export class ArticleEffects implements OnInitEffects {
  private actions$ = inject(Actions);
  private articleLoaderService = inject(ArticleLoaderService);

  loadArticles$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleInitActions.loadArticles),
      concatMap(() =>
        this.articleLoaderService.load().pipe(
          map(articles =>
            articleApiActions.loadArticlesSuccess({ articles })
          ),
          catchError(error =>
            of(articleApiActions.loadArticlesFailure({ error }))
          )
        )
      )
    )
  );

  createArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articleListPageActions.createArticle),
      concatMap(action =>
        this.articleLoaderService.create(action.article).pipe(
          map(article =>
            articleApiActions.createArticleSuccess({ article })
          ),
          catchError(error =>
            of(articleApiActions.createArticleFailure({ error }))
          )
        )
      )
    )
  );

  deleteArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articlePageActions.deleteArticle),
      concatMap(action =>
        this.articleLoaderService.delete(action.article).pipe(
          map(() =>
            articleApiActions.deleteArticleSuccess({
              articleId: action.article.id
            })
          ),
          catchError(error =>
            of(articleApiActions.deleteArticleFailure({ error }))
          )
        )
      )
    )
  );

  updateArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(articlePageActions.updateArticle),
      concatMap(action =>
        this.articleLoaderService.update(action.article).pipe(
          map(() =>
            articleApiActions.updateArticleSuccess({
              article: action.article
            })
          ),
          catchError(error =>
            of(articleApiActions.updateArticleFailure({ error }))
          )
        )
      )
    )
  );

  handleError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          articleApiActions.loadArticlesFailure,
          articleApiActions.createArticleFailure,
          articleApiActions.deleteArticleFailure,
          articleApiActions.updateArticleFailure
        ),
        tap(({ type, error }) => {
          console.error('Error with', type, error);
        })
      ),
    { dispatch: false }
  );

  // This is a special lifecycle hook - it defines which action
  // initializes the Article feature.
  ngrxOnInitEffects(): Action {
    return articleInitActions.loadArticles();
  }
}
