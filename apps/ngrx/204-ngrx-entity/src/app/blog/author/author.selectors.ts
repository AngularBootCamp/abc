import { createSelector } from '@ngrx/store';

import { selectCurrentAuthorId } from '../../router.selectors';

import { authorFeature } from './author.reducer';

export const { selectAuthors } = authorFeature;

export const selectCurrentAuthor = createSelector(
  selectAuthors,
  selectCurrentAuthorId,
  (authors, authorId) =>
    authors.find(author => author.id === authorId)
);
