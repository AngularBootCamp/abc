/* eslint-disable @angular-eslint/use-injectable-provided-in
-- Effect injectables are handled by NgRx
*/
import { Injectable, inject } from '@angular/core';

import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import {
  Actions,
  OnInitEffects,
  createEffect,
  ofType,
} from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { userProfileActions } from './user-profile.actions';
import { UserProfileService } from './user-profile.service';

@Injectable()
export class UserProfileEffects implements OnInitEffects {
  private readonly actions$ = inject(Actions);
  private readonly userProfileSvc = inject(UserProfileService);

  public readonly loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.loadUserProfile),
      switchMap(() =>
        this.userProfileSvc.loadUserProfile().pipe(
          map(profile =>
            userProfileActions.loadUserProfileSuccess({ profile }),
          ),
          catchError(error =>
            of(userProfileActions.loadUserProfileFailure({ error })),
          ),
        ),
      ),
    ),
  );

  public readonly saveUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userProfileActions.saveUserProfile),
      mergeMap(action =>
        this.userProfileSvc.saveUserProfile(action.profile).pipe(
          map(profile =>
            userProfileActions.saveUserProfileSuccess({ profile }),
          ),
          catchError(error =>
            of(userProfileActions.saveUserProfileFailure({ error })),
          ),
        ),
      ),
    ),
  );

  ngrxOnInitEffects(): Action {
    return userProfileActions.loadUserProfile();
  }
}
