import { createSelector } from '@ngrx/store';

import { selectCurrentArticleId } from '../../router.selectors';

import { articleFeature } from './article.reducer';

export const { selectArticles } = articleFeature;

export const selectArticlesByAuthor = (authorId: string | number) =>
  createSelector(selectArticles, articles =>
    articles.filter(article => article.authorId === Number(authorId))
  );

export const selectCurrentArticle = createSelector(
  selectArticles,
  selectCurrentArticleId,
  (articles, articleId) =>
    !articleId
      ? undefined // no query param for article
      : // return null if we cannot find article
        (articles.find(article => article.id === articleId) ?? null)
);
