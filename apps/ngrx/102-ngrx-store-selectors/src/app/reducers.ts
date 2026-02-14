import { ActionReducerMap } from '@ngrx/store';

import { homeTaskReducer } from './home-task.state';
import { AppState } from './state';
import { workTaskReducer } from './work-task.state';

export const reducers: ActionReducerMap<AppState> = {
  workTasks: workTaskReducer,
  homeTasks: homeTaskReducer
};
