import {
  createActionGroup,
  createFeatureSelector,
  createReducer,
  createSelector,
  emptyProps,
  on,
  props
} from '@ngrx/store';

import { generalActions } from './state';
import { Task } from './types';

export const workTaskActions = createActionGroup({
  source: 'Work Tasks',
  events: {
    'Set Work Task': props<{ task: Task; complete: boolean }>(),
    'Load Work Tasks': emptyProps(),
    'Load Work Tasks Success': props<{ tasks: WorkTaskState }>(),
    'Load Work Tasks Failure': props<{ error: unknown }>()
  }
});

export interface WorkTaskState {
  todoWork: Task[];
  doneWork: Task[];
}

const defaultWorkTaskState: WorkTaskState = {
  todoWork: [],
  doneWork: []
};

export const workTaskReducer = createReducer(
  defaultWorkTaskState,
  on(workTaskActions.setWorkTask, (state, action) =>
    setWorkTaskStatus(state, action.task, action.complete)
  ),
  on(generalActions.completeAllSuccess, state => ({
    doneWork: [...state.doneWork, ...state.todoWork],
    todoWork: []
  })),
  on(
    workTaskActions.loadWorkTasksSuccess,
    (_state, action) => action.tasks
  )
);

function setWorkTaskStatus(
  currentState: WorkTaskState,
  task: Task,
  complete: boolean
): WorkTaskState {
  const todoWork = currentState.todoWork.filter(x => x !== task);
  const doneWork = currentState.doneWork.filter(x => x !== task);
  if (complete) {
    todoWork.push(task);
  } else {
    doneWork.push(task);
  }
  return { todoWork, doneWork };
}

// defensive copy of the data coming out of the store
// createSelector will memoize (cache) the result, meaning it will
// give the same object until the state changes
const selectWorkTaskState =
  createFeatureSelector<WorkTaskState>('workTasks');

export const selectTodoWork = createSelector(
  selectWorkTaskState,
  state => [...state.todoWork]
);

export const selectDoneWork = createSelector(
  selectWorkTaskState,
  state => [...state.doneWork]
);
