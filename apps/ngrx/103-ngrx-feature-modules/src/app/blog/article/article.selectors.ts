import { createSelector } from '@ngrx/store';

import { articleFeature } from './article.reducer';

export const { selectArticles, selectCurrentArticleId } =
  articleFeature;

export const selectArticlesByAuthor = (authorId: string | number) =>
  createSelector(selectArticles, articles =>
    articles.filter(article => article.authorId === Number(authorId))
  );

export const selectCurrentArticle = createSelector(
  selectArticles,
  selectCurrentArticleId,
  (articles, articleId) =>
    articles.find(article => article.id === articleId)
);
