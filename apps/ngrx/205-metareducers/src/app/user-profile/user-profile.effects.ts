/* eslint-disable @angular-eslint/use-injectable-provided-in
-- Effect injectables are handled by NgRx
*/
import { Injectable, inject } from '@angular/core';

import { catchError, map, mergeMap, of } from 'rxjs';

import {
  Actions,
  OnInitEffects,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { Action } from '@ngrx/store';

import {
  userProfileApiActions,
  userProfileInitActions,
  userProfilePageActions,
} from './user-profile.actions';
import { UserProfileService } from './user-profile.service';

@Injectable()
export class UserProfileEffects implements OnInitEffects {
  private actions$ = inject(Actions);
  private userProfileSvc = inject(UserProfileService);

  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileInitActions.loadUserProfile),
      mergeMap(() =>
        this.userProfileSvc.loadUserProfile().pipe(
          map(profile =>
            userProfileApiActions.loadUserProfileSuccess({ profile }),
          ),
          catchError(error =>
            of(userProfileApiActions.loadUserProfileFailure({ error })),
          ),
        ),
      ),
    ),
  );

  saveUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfilePageActions.saveUserProfile),
      mergeMap(action =>
        this.userProfileSvc.saveUserProfile(action.profile).pipe(
          map(profile =>
            userProfileApiActions.saveUserProfileSuccess({ profile }),
          ),
          catchError(error =>
            of(userProfileApiActions.saveUserProfileFailure({ error })),
          ),
        ),
      ),
    ),
  );

  ngrxOnInitEffects(): Action {
    return userProfileInitActions.loadUserProfile();
  }
}
