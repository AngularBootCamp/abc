import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { UserProfile } from './user-profile.types';

export const userProfileActions = createActionGroup({
  source: 'User Profile',
  events: {
    'Load User Profile': emptyProps(),
    'Load User Profile Success': props<{ profile: UserProfile }>(),
    'Load User Profile Failure': props<{ error: unknown }>(),
    'Save User Profile': props<{ profile: UserProfile }>(),
    'Save User Profile Success': props<{ profile: UserProfile }>(),
    'Save User Profile Failure': props<{ error: unknown }>()
  }
});
