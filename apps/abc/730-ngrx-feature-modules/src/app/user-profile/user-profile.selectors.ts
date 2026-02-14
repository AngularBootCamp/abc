import { createSelector } from '@ngrx/store';

import { userProfileFeature } from './user-profile.reducer';

export const { selectUserProfile } = userProfileFeature;

export const selectUserName = createSelector(
  selectUserProfile,
  profile => profile?.name || ''
);
