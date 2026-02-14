import { createSelector } from '@ngrx/store';

import { authorFeature } from './author.reducer';

export const { selectAuthors } = authorFeature;

export const selectAuthor = (id: string | number) =>
  createSelector(selectAuthors, authors =>
    authors.find(author => author.id === +id)
  );
