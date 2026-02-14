import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { UserProfile } from './user-profile.types';

export const userProfileInitActions = createActionGroup({
  source: 'User Profile Init',
  events: {
    'Load User Profile': emptyProps()
  }
});

export const userProfilePageActions = createActionGroup({
  source: 'User Profile Page',
  events: {
    'Save User Profile': props<{ profile: UserProfile }>()
  }
});

export const userProfileApiActions = createActionGroup({
  source: 'User Profile Api',
  events: {
    'Load User Profile Success': props<{ profile: UserProfile }>(),
    'Load User Profile Failure': props<{ error: unknown }>(),
    'Save User Profile Success': props<{ profile: UserProfile }>(),
    'Save User Profile Failure': props<{ error: unknown }>()
  }
});
