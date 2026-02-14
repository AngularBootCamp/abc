import {
  createActionGroup,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props
} from '@ngrx/store';

import { globalActions } from './state';
import { Task } from './types';

export const homeTaskActions = createActionGroup({
  source: 'Home Tasks',
  events: {
    'Task Completed': props<{ task: Task }>(),
    'Task Reset': props<{ task: Task }>()
  }
});

export interface HomeTaskState {
  todo: Task[];
  done: Task[];
}

const defaultHomeTaskState: HomeTaskState = {
  todo: [],
  done: []
};

export const homeTaskReducer = createReducer(
  defaultHomeTaskState,
  on(homeTaskActions.taskCompleted, (state, action) =>
    setHomeTaskStatus(state, action.task, true)
  ),
  on(homeTaskActions.taskReset, (state, action) =>
    setHomeTaskStatus(state, action.task, false)
  ),
  on(globalActions.completeAll, state => ({
    done: [...state.done, ...state.todo],
    todo: []
  })),
  on(
    globalActions.tasksReceived,
    (_state, { homeTasks }) => homeTasks
  )
);

function setHomeTaskStatus(
  currentState: HomeTaskState,
  task: Task,
  markDone: boolean
): HomeTaskState {
  const done = currentState.done.filter(x => x !== task);
  const todo = currentState.todo.filter(x => x !== task);
  if (markDone) {
    done.push(task);
  } else {
    todo.push(task);
  }
  return { todo, done };
}

// createSelector will memoize (cache) the result, meaning it will
// give the same object until the state changes
const selectHomeTaskState =
  createFeatureSelector<HomeTaskState>('homeTasks');

export const selectTodoHome = createSelector(
  selectHomeTaskState,
  state => [...state.todo]
);

export const selectDoneHome = createSelector(
  selectHomeTaskState,
  state => [...state.done]
);
