import { Injectable, inject } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  OnInitEffects
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, of } from 'rxjs';

import {
  userProfileApiActions,
  userProfileInitActions,
  userProfilePageActions
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
            userProfileApiActions.loadUserProfileSuccess({ profile })
          ),
          catchError(error =>
            of(
              userProfileApiActions.loadUserProfileFailure({ error })
            )
          )
        )
      )
    )
  );

  saveUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfilePageActions.saveUserProfile),
      mergeMap(action =>
        this.userProfileSvc.saveUserProfile(action.profile).pipe(
          map(profile =>
            userProfileApiActions.saveUserProfileSuccess({ profile })
          ),
          catchError(error =>
            of(
              userProfileApiActions.saveUserProfileFailure({ error })
            )
          )
        )
      )
    )
  );

  ngrxOnInitEffects(): Action {
    return userProfileInitActions.loadUserProfile();
  }
}
