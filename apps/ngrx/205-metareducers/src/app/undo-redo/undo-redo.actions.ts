import { createActionGroup, emptyProps } from '@ngrx/store';

export const undoRedoActions = createActionGroup({
  source: 'Undo/Redo',
  events: {
    'Undo action': emptyProps(),
    'Redo action': emptyProps()
  }
});
