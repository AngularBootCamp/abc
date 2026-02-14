import { ActionReducerMap } from '@ngrx/store';

import { homeTaskReducer } from './home-tasks.state';
import { AppState } from './state';
import { workTaskReducer } from './work-tasks.state';

export const reducers: ActionReducerMap<AppState> = {
  workTasks: workTaskReducer,
  homeTasks: homeTaskReducer
};
