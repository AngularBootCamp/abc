import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';
import { appApiActions } from '../app.actions';
import * as fromUndoredo from '../undo-redo/undo-redo.meta';
import * as fromUserProfile from '../user-profile/user-profile.reducer';

export interface AppState {
  [fromUserProfile.userProfileFeature.name]: fromUserProfile.State;
  [fromUndoredo.undoRedoFeatureKey]: fromUndoredo.UndoRedoState;
}

export const reducers: ActionReducerMap<AppState> = {
  [fromUserProfile.userProfileFeature.name]:
    fromUserProfile.userProfileFeature.reducer,
  [fromUndoredo.undoRedoFeatureKey]: fromUndoredo.undoRedoReducer
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

export function clear(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return function newReducer(state, action) {
    if (action.type === appApiActions.clearStateSuccess.type) {
      // clear everything but undoRedo
      return reducer(
        {
          [fromUndoredo.undoRedoFeatureKey]:
            state[fromUndoredo.undoRedoFeatureKey]
        },
        action
      );
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [
  // always include undo/redo and clear

  // must be before clear, otherwise clear will destroy history before
  // undo/redo gets a chance to save it
  fromUndoredo.undoRedoMeta,
  clear,
  // include logger only for non-production
  ...(!environment.production ? [logger] : [])
];
