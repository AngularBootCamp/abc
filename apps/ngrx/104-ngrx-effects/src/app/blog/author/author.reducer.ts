import { createFeature, createReducer, on } from '@ngrx/store';

import { Author } from '../types';

import { authorApiActions } from './author.actions';

export interface State {
  authors: Author[];
}

export const initialState: State = {
  authors: []
};

export const authorFeature = createFeature({
  name: 'author',
  reducer: createReducer(
    initialState,
    on(authorApiActions.loadAuthorsSuccess, (state, action) => ({
      ...state,
      authors: [...action.authors]
    }))
  )
});
