import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  articleIdQueryParam,
  authorIdRouteParam
} from './routing-parameters';

export interface State {
  router: fromRouter.RouterReducerState;
}

export const selectRouter =
  createFeatureSelector<fromRouter.RouterReducerState>('router');

export const { selectRouteParam, selectQueryParam } =
  fromRouter.getRouterSelectors(selectRouter);

const selectCurrentArticleIdParam = selectQueryParam(
  articleIdQueryParam
);

export const selectCurrentArticleId = createSelector(
  selectCurrentArticleIdParam,
  articleId => (articleId ? Number(articleId) : undefined)
);

const selectCurrentAuthorIdParam = selectRouteParam(
  authorIdRouteParam
);

export const selectCurrentAuthorId = createSelector(
  selectCurrentAuthorIdParam,
  authorId => (authorId ? Number(authorId) : undefined)
);
