import { createFeature, createReducer, on } from '@ngrx/store';

import { userProfileApiActions } from './user-profile.actions';
import { UserProfile } from './user-profile.types';

export interface State {
  userProfile: UserProfile | undefined;
}

export const initialState: State = {
  userProfile: undefined
};

export const userProfileFeature = createFeature({
  name: 'userProfile',
  // loadUserProfileSuccess and saveUserProfileSuccess are handled
  // in the same way here so we can pass both of them to the same on() handler.
  // We keep them as separate actions though to preserve semantics.
  // This makes it easier to track and understand what is happening in our
  // system over time.
  reducer: createReducer(
    initialState,
    on(
      userProfileApiActions.loadUserProfileSuccess,
      userProfileApiActions.saveUserProfileSuccess,
      (_state, action) => ({ userProfile: action.profile })
    )
  )
});
