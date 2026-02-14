import { Injectable } from '@angular/core';
import { OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { taskApiActions } from './tasks.actions';
import { TaskState } from './tasks.reducer';

const initialTasks: TaskState = {
  done: [
    { label: 'cook dinner' },
    { label: 'go grocery shopping' },
    { label: 'sweep the floors' },
    { label: 'do the laundry' }
  ],
  todo: [{ label: 'fix the leaky faucet' }, { label: 'mow the lawn' }]
};

@Injectable()
export class TasksEffects implements OnInitEffects {
  ngrxOnInitEffects(): Action {
    return taskApiActions.tasksReceived({ tasks: initialTasks });
  }
}
