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

export const workTaskActions = createActionGroup({
  source: 'Work Tasks',
  events: {
    'Task Completed': props<{ task: Task }>(),
    'Task Reset': props<{ task: Task }>()
  }
});

export interface WorkTaskState {
  todo: Task[];
  done: Task[];
}

const defaultWorkTaskState: WorkTaskState = {
  todo: [],
  done: []
};

export const workTaskReducer = createReducer(
  defaultWorkTaskState,
  on(workTaskActions.taskCompleted, (state, action) =>
    setWorkTaskStatus(state, action.task, true)
  ),
  on(workTaskActions.taskReset, (state, action) =>
    setWorkTaskStatus(state, action.task, false)
  ),
  on(globalActions.completeAll, state => ({
    done: [...state.done, ...state.todo],
    todo: []
  })),
  on(
    globalActions.tasksReceived,
    (_state, { workTasks }) => workTasks
  )
);

function setWorkTaskStatus(
  currentState: WorkTaskState,
  task: Task,
  markDone: boolean
): WorkTaskState {
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
const selectWorkTaskState =
  createFeatureSelector<WorkTaskState>('workTasks');

export const selectTodoWork = createSelector(
  selectWorkTaskState,
  state => [...state.todo]
);

export const selectDoneWork = createSelector(
  selectWorkTaskState,
  state => [...state.done]
);
