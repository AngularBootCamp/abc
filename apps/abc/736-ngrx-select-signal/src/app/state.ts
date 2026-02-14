import { createActionGroup, emptyProps } from '@ngrx/store';

import { HomeTaskState } from './home-tasks.state';
import { WorkTaskState } from './work-tasks.state';

export const generalActions = createActionGroup({
  source: 'General',
  events: {
    'Complete All': emptyProps(),
    'Complete All Success': emptyProps()
  }
});

export interface AppState {
  workTasks: WorkTaskState;
  homeTasks: HomeTaskState;
}
