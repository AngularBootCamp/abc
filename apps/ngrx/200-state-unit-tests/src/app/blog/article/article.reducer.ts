import { createFeature, createReducer, on } from '@ngrx/store';

import { Article } from '../types';

import {
  articleApiActions,
  articleListPageActions
} from './article.actions';

export interface State {
  articles: Article[];
  currentArticleId: number | undefined;
}

export const initialState: State = {
  articles: [],
  currentArticleId: undefined
};

export const articleFeature = createFeature({
  name: 'article',
  reducer: createReducer(
    initialState,

    on(articleApiActions.loadArticlesSuccess, (state, action) => ({
      ...state,
      articles: [...action.articles]
    })),
    on(articleApiActions.createArticleSuccess, (state, action) => ({
      ...state,
      articles: [...state.articles, action.article]
    })),
    on(articleApiActions.deleteArticleSuccess, (state, action) => ({
      ...state,
      articles: state.articles.filter(
        article => article.id !== action.articleId
      )
    })),
    on(articleApiActions.updateArticleSuccess, (state, action) => {
      const index = state.articles.findIndex(
        article => article.id === action.article.id
      );
      if (index >= 0) {
        return {
          ...state,
          articles: [
            ...state.articles.slice(0, index),
            action.article,
            ...state.articles.slice(index + 1, state.articles.length)
          ]
        };
      } else {
        return state;
      }
    }),
    on(articleListPageActions.chooseArticle, (state, action) => ({
      ...state,
      currentArticleId: action.articleId
    }))
  )
});
