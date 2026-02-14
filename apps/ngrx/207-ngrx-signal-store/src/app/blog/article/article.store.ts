import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setAllEntities,
  updateEntity,
  withEntities
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Store } from '@ngrx/store';
import { concatMap, filter, pipe } from 'rxjs';

import { selectCurrentArticleId } from '../../router.selectors';
import { ArticleLoaderService } from '../article-list/article-loader.service';
import { Article } from '../types';

export const ArticleStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withEntities<Article>(),
  withComputed(({ entityMap }) => {
    const store = inject(Store);
    const articleId = store.selectSignal(selectCurrentArticleId);

    return {
      currentArticle: computed(() => {
        const id = articleId();
        const map = entityMap();
        return id ? (map[id] ?? null) : undefined;
      })
    };
  }),
  withMethods(state => {
    const articleLoaderService = inject(ArticleLoaderService);

    return {
      load: rxMethod<void>(
        pipe(
          concatMap(() => {
            return articleLoaderService.load().pipe(
              tapResponse({
                next: newArticles =>
                  patchState(state, setAllEntities(newArticles)),
                error: error =>
                  console.error('Error with Load Articles', error)
              })
            );
          })
        )
      ),
      createArticle: rxMethod<Omit<Article, 'id'>>(
        pipe(
          concatMap(article => {
            return articleLoaderService.create(article).pipe(
              tapResponse({
                next: newArticle =>
                  patchState(state, addEntity(newArticle)),
                error: error =>
                  console.error('Error with Create Article', error)
              })
            );
          })
        )
      ),
      deleteArticle: rxMethod<Article>(
        pipe(
          // Having the confirmation in the component was fine, but we
          // move it here to show an example of how to test a dispatching
          // effect that does not dispatch.
          filter(() =>
            window.confirm(
              'Are you sure you want to delete this article?'
            )
          ),
          concatMap(article => {
            return articleLoaderService.delete(article).pipe(
              tapResponse({
                next: () =>
                  patchState(state, removeEntity(article.id)),
                error: error =>
                  console.error('Error with Delete Article', error)
              })
            );
          })
        )
      ),
      updateArticle: rxMethod<Article>(
        pipe(
          concatMap(article => {
            return articleLoaderService.update(article).pipe(
              tapResponse({
                next: updatedArticle =>
                  patchState(
                    state,
                    updateEntity({
                      id: article.id,
                      changes: updatedArticle
                    })
                  ),
                error: error =>
                  console.error('Error with Update Article', error)
              })
            );
          })
        )
      )
    };
  }),
  withHooks({
    onInit({ load }) {
      load();
    }
  })
);

// Necessary to inject ArticleStore as a type
export type ArticleStore = InstanceType<typeof ArticleStore>;
