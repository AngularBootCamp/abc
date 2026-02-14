import { createSelector } from '@ngrx/store';

import { selectCurrentAuthorId } from '../../router.selectors';

import { adapter, authorFeature } from './author.reducer';

export const { selectAuthorState } = authorFeature;

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAuthors = createSelector(
  selectAuthorState,
  selectAll
);

const selectAuthorEntities = createSelector(
  selectAuthorState,
  selectEntities
);

export const selectCurrentAuthor = createSelector(
  selectAuthorEntities,
  selectCurrentAuthorId,
  (entities, authorId) => (authorId ? entities[authorId] : undefined)
);
