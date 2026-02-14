import { createSelector } from '@ngrx/store';

import { selectCurrentArticleId } from '../../router.selectors';

import { articleFeature, adapter } from './article.reducer';

export const { selectArticleState } = articleFeature;

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectArticles = createSelector(
  selectArticleState,
  selectAll
);

export const selectArticlesByAuthor = (authorId: string | number) =>
  createSelector(selectArticles, articles =>
    articles.filter(article => article.authorId === Number(authorId))
  );

const selectArticleEntities = createSelector(
  selectArticleState,
  selectEntities
);

export const selectCurrentArticle = createSelector(
  selectArticleEntities,
  selectCurrentArticleId,
  (entities, articleId) =>
    articleId ? (entities[articleId] ?? null) : undefined
);
