import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUndoredo from '../undo-redo/undo-redo.meta';

const selectUndoRedoState =
  createFeatureSelector<fromUndoredo.UndoRedoState>(
    fromUndoredo.undoRedoFeatureKey
  );

export const selectUndoAvailable = createSelector(
  selectUndoRedoState,
  state => state.undoOperations.length > 0
);

export const selectRedoAvailable = createSelector(
  selectUndoRedoState,
  state => state.redoOperations.length > 0
);
