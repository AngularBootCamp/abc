import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { Store } from '@ngrx/store';

import { HomeTaskState } from '../home-task.state';
import { globalActions } from '../state';
import { WorkTaskState } from '../work-task.state';

import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrl: './notification-manager.component.scss',
  imports: [WorkTaskListComponent, HomeTaskListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationManagerComponent {
  private readonly store = inject(Store);

  constructor() {
    const workTasks: WorkTaskState = {
      done: [
        { label: 'File paperwork' },
        { label: 'Send emails' },
        { label: 'Work on project A' },
        { label: 'Submit report to manager' }
      ],
      todo: [
        { label: 'Work on project B' },
        { label: 'Update task list' }
      ]
    };

    const homeTasks: HomeTaskState = {
      done: [
        { label: 'Cook dinner' },
        { label: 'Go grocery shopping' },
        { label: 'Sweep the floors' },
        { label: 'Do the laundry' }
      ],
      todo: [
        { label: 'Fix the leaky faucet' },
        { label: 'Mow the lawn' }
      ]
    };

    this.store.dispatch(
      globalActions.tasksReceived({ workTasks, homeTasks })
    );
  }

  protected completeAll() {
    this.store.dispatch(globalActions.completeAll());
  }
}
