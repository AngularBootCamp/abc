import {
  EntityAdapter,
  EntityState,
  createEntityAdapter
} from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { Author } from '../types';

import { authorApiActions } from './author.actions';

export type State = EntityState<Author>;

export const adapter: EntityAdapter<Author> =
  createEntityAdapter<Author>();

export const initialState: State = adapter.getInitialState({});

export const authorFeature = createFeature({
  name: 'author',
  reducer: createReducer(
    initialState,

    on(authorApiActions.loadAuthorsSuccess, (state, action) =>
      adapter.setAll(action.authors, state)
    )
  )
});
