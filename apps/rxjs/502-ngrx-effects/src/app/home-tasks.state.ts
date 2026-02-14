import {
  createActionGroup,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props
} from '@ngrx/store';

import { generalActions } from './state';
import { Task } from './types';

export const homeTaskActions = createActionGroup({
  source: 'Home Tasks',
  events: {
    'Set Home Task': props<{ task: Task; complete: boolean }>(),
    'Home Tasks Received': props<{ tasks: HomeTaskState }>()
  }
});

const defaultHomeTaskState: HomeTaskState = {
  todoHome: [],
  doneHome: []
};

export interface HomeTaskState {
  todoHome: Task[];
  doneHome: Task[];
}

export const homeTaskReducer = createReducer(
  defaultHomeTaskState,
  on(homeTaskActions.setHomeTask, (state, action) =>
    setHomeTaskStatus(state, action.task, action.complete)
  ),
  on(generalActions.completeAllSuccess, state => ({
    doneHome: [...state.doneHome, ...state.todoHome],
    todoHome: []
  })),
  on(
    homeTaskActions.homeTasksReceived,
    (_state, action) => action.tasks
  )
);

function setHomeTaskStatus(
  currentState: HomeTaskState,
  task: Task,
  complete: boolean
): HomeTaskState {
  const todoHome = currentState.todoHome.filter(x => x !== task);
  const doneHome = currentState.doneHome.filter(x => x !== task);
  if (complete) {
    todoHome.push(task);
  } else {
    doneHome.push(task);
  }
  return { todoHome, doneHome };
}

// createSelector will memoize (cache) the result, meaning it will
// give the same object until the state changes
const selectHomeTaskState =
  createFeatureSelector<HomeTaskState>('homeTasks');

export const selectTodoHome = createSelector(
  selectHomeTaskState,
  state => state.todoHome
);

export const selectDoneHome = createSelector(
  selectHomeTaskState,
  state => state.doneHome
);
