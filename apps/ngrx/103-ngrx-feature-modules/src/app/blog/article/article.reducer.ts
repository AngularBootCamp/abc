import { createFeature, createReducer, on } from '@ngrx/store';

import { Article } from '../types';

import { articleActions } from './article.actions';

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

    on(articleActions.loadArticlesSuccess, (state, action) => ({
      ...state,
      articles: [...action.articles]
    })),
    on(articleActions.createArticle, (state, action) => ({
      ...state,
      articles: [
        ...state.articles,
        {
          ...action.article,
          // todo: with Effects, we'll be able to get the new id from
          //  the server
          id:
            Math.max(...state.articles.map(article => article.id)) + 1
        }
      ]
    })),
    on(articleActions.deleteArticle, (state, action) => ({
      ...state,
      articles: state.articles.filter(
        article => article.id !== action.article.id
      )
    })),
    on(articleActions.updateArticle, (state, action) => {
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
    on(articleActions.chooseArticle, (state, action) => ({
      ...state,
      currentArticleId: action.articleId
    }))
  )
});
