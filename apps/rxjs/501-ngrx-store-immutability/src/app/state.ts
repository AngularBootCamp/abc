import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { HomeTaskState } from './home-task.state';
import { WorkTaskState } from './work-task.state';

export const globalActions = createActionGroup({
  source: 'Page',
  events: {
    'Complete All': emptyProps(),
    'Tasks Received': props<{
      workTasks: WorkTaskState;
      homeTasks: HomeTaskState;
    }>()
  }
});

export interface AppState {
  workTasks: WorkTaskState;
  homeTasks: HomeTaskState;
}
