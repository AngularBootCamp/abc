import { createActionGroup, props } from '@ngrx/store';

import { Task } from '../types';

import { TaskState } from './tasks.reducer';

export const taskPageActions = createActionGroup({
  source: 'Task Page',
  events: {
    'Task Completed': props<{ task: Task }>(),
    'Task Reset': props<{ task: Task }>()
  }
});

export const taskApiActions = createActionGroup({
  source: 'Task Api',
  events: {
    'Tasks Received': props<{ tasks: TaskState }>()
  }
});
