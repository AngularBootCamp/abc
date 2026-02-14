import {
  EntityAdapter,
  EntityState,
  createEntityAdapter
} from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { Article } from '../types';

import { articleApiActions } from './article.actions';

// Note: this is the alternate syntax that can be extended with other
// properties
// export interface State extends EntityState<Article> {}
export type State = EntityState<Article>;

export const adapter: EntityAdapter<Article> =
  createEntityAdapter<Article>();

export const initialState: State = adapter.getInitialState({});

export const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,

    on(articleApiActions.loadArticlesSuccess, (state, action) =>
      adapter.setAll(action.articles, state)
    ),
    on(articleApiActions.createArticleSuccess, (state, action) =>
      adapter.addOne(action.article, state)
    ),
    on(articleApiActions.deleteArticleSuccess, (state, action) =>
      adapter.removeOne(action.articleId, state)
    ),
    // Note: if we weren't sending this to the server, we could
    // use the Update<Article> type, which is smaller
    on(articleApiActions.updateArticleSuccess, (state, { article }) =>
      adapter.updateOne({ id: article.id, changes: article }, state)
    )
  )
});
