import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  router: fromRouter.RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer
};
