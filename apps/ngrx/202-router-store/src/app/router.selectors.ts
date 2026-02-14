import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { articleIdQueryParam } from './routing-parameters';

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
