import { OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { HomeTaskState, homeTaskActions } from './home-tasks.state';

const initialHomeTasks: HomeTaskState = {
  doneHome: [
    { label: 'cook dinner' },
    { label: 'go grocery shopping' },
    { label: 'sweep the floors' },
    { label: 'do the laundry' }
  ],
  todoHome: [
    { label: 'fix the leaky faucet' },
    { label: 'mow the lawn' }
  ]
};

export class HomeTasksEffects implements OnInitEffects {
  ngrxOnInitEffects(): Action {
    return homeTaskActions.homeTasksReceived({
      tasks: initialHomeTasks
    });
  }
}
