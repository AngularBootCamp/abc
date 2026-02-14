import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { environment } from '../../environments/environment';
import * as fromUserProfile from '../user-profile/user-profile.reducer';

export interface AppState {
  [fromUserProfile.userProfileFeatureKey]: fromUserProfile.State;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromUserProfile.userProfileFeatureKey]:
    fromUserProfile.userProfileFeature.reducer
};

export const metaReducers: MetaReducer<AppState>[] =
  !environment.production ? [] : [];
