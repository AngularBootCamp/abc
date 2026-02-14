import { ActionReducer } from '@ngrx/store';
import { pick } from 'lodash-es';

import { appApiActions } from '../app.actions';
import { AppState } from '../reducers';
import { taskPageActions } from '../tasks/tasks.actions';
import { userProfileApiActions } from '../user-profile/user-profile.actions';

import { undoRedoActions } from './undo-redo.actions';

interface UndoRedoOperation {
  type: string;
  state: Partial<AppState>;
}

export interface UndoRedoState {
  undoOperations: UndoRedoOperation[];
  redoOperations: UndoRedoOperation[];
}

const initialState: UndoRedoState = {
  undoOperations: [],
  redoOperations: []
};

const UNDOABLE_ACTIONS: string[] = [
  taskPageActions.taskCompleted.type,
  taskPageActions.taskReset.type,
  appApiActions.clearStateSuccess.type,
  userProfileApiActions.saveUserProfileSuccess.type
];

const UNDOABLE_KEYS = ['tasks', 'userProfile'];

export const undoRedoFeatureKey = 'undoRedo';

export function undoRedoMeta(
  reducer: ActionReducer<any>
): ActionReducer<AppState> {
  return (state, action) => {
    function onUndo() {
      if (!state?.undoRedo.undoOperations.length) {
        return state;
      }

      const undoOperations = state.undoRedo.undoOperations;
      const previous = undoOperations[undoOperations.length - 1];
      const newUndoOperations = undoOperations.slice(
        0,
        undoOperations.length - 1
      );

      return {
        ...state,
        ...previous.state,
        undoRedo: {
          undoOperations: newUndoOperations,
          redoOperations: [
            {
              type: previous.type,
              state: extractState(state)
            },
            ...state.undoRedo.redoOperations
          ]
        }
      };
    }

    function onRedo() {
      if (!state?.undoRedo.redoOperations.length) {
        return state;
      }

      const redoOperations = state.undoRedo.redoOperations;
      const next = redoOperations[0];
      const newFuture = redoOperations.slice(1);

      return {
        ...state,
        ...next.state,
        undoRedo: {
          undoOperations: [
            ...state.undoRedo.undoOperations,
            { type: next.type, state: extractState(state) }
          ],
          redoOperations: newFuture
        }
      };
    }

    switch (action.type) {
      case undoRedoActions.undoAction.type:
        return onUndo();
      case undoRedoActions.redoAction.type:
        return onRedo();
      default: {
        // Delegate handling the action to the passed reducer
        const newState = reducer(state, action);

        if (state && UNDOABLE_ACTIONS.includes(action.type)) {
          return {
            ...newState,
            undoRedo: {
              undoOperations: [
                ...state.undoRedo.undoOperations,
                { type: action.type, state: extractState(state) }
              ],
              redoOperations: []
            }
          };
        } else {
          return newState;
        }
      }
    }
  };
}

/**
 * Retrieves undoable part of the state.
 *
 * @param state application state
 */
function extractState(state: Partial<AppState>) {
  return pick(state, UNDOABLE_KEYS);
}

// The state for 'undoRedo' is all managed in the metareducer, but we need a
// standard reducer because undoRedo is state at the base level of AppState
export function undoRedoReducer(state = initialState): UndoRedoState {
  return state;
}
