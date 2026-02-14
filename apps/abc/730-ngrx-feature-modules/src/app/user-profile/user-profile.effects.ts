import { Injectable, inject } from '@angular/core';
import {
  Actions,
  OnInitEffects,
  createEffect,
  ofType
} from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { of, catchError, map, mergeMap, switchMap } from 'rxjs';

import { userProfileActions } from './user-profile.actions';
import { UserProfileService } from './user-profile.service';

@Injectable()
export class UserProfileEffects implements OnInitEffects {
  private actions$ = inject(Actions);
  private userProfileSvc = inject(UserProfileService);

  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.loadUserProfile),
      switchMap(() =>
        this.userProfileSvc.loadUserProfile().pipe(
          map(profile =>
            userProfileActions.loadUserProfileSuccess({ profile })
          ),
          catchError(error =>
            of(userProfileActions.loadUserProfileFailure({ error }))
          )
        )
      )
    )
  );

  saveUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.saveUserProfile),
      mergeMap(action =>
        this.userProfileSvc.saveUserProfile(action.profile).pipe(
          map(profile =>
            userProfileActions.saveUserProfileSuccess({ profile })
          ),
          catchError(error =>
            of(userProfileActions.saveUserProfileFailure({ error }))
          )
        )
      )
    )
  );

  ngrxOnInitEffects(): Action {
    return userProfileActions.loadUserProfile();
  }
}
