import * as fromRouter from '@ngrx/router-store';
import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createReducer,
  on,
  props,
  createActionGroup,
  createFeature
} from '@ngrx/store';

import { environment } from '../../environments/environment';

export const configActions = createActionGroup({
  source: 'Config',
  events: {
    'Update Title': props<{ title: string }>()
  }
});

export interface ConfigState {
  title: string;
}

const initialConfigState: ConfigState = {
  title: 'Our Blog'
};

export interface AppState {
  config: ConfigState;
  router: fromRouter.RouterReducerState;
}

const configFeature = createFeature({
  name: 'config',
  reducer: createReducer(
    initialConfigState,
    on(configActions.updateTitle, (state, action) => ({
      ...state,
      title: action.title
    }))
  )
});

export const reducers: ActionReducerMap<AppState> = {
  config: configFeature.reducer,
  router: fromRouter.routerReducer
};

export function logger(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function newReducer(state, action) {
    console.group(action.type);
    const nextState = reducer(state, action);
    console.log(
      `%c prev state`,
      `color: #9E9E9E; font-weight: bold`,
      state
    );
    console.log(
      `%c action`,
      `color: #03A9F4; font-weight: bold`,
      action
    );
    console.log(
      `%c next state`,
      `color: #4CAF50; font-weight: bold`,
      nextState
    );
    console.groupEnd();
    return nextState;
  };
}

export const metaReducers: MetaReducer<AppState>[] = [
  // include logger only for non-production
  ...(!environment.production ? [logger] : [])
];

export const selectTitle = configFeature.selectTitle;
