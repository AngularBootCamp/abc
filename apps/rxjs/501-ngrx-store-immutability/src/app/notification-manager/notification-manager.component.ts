import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
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
  imports: [
    WorkTaskListComponent,
    HomeTaskListComponent,
    MatButtonModule
  ]
})
export class NotificationManagerComponent {
  private store = inject(Store);

  constructor() {
    const workTasks: WorkTaskState = {
      done: [
        { label: 'file paperwork' },
        { label: 'send emails' },
        { label: 'work on project A' },
        { label: 'submit report to manager' }
      ],
      todo: [
        { label: 'work on project B' },
        { label: 'update task list' }
      ]
    };

    const homeTasks: HomeTaskState = {
      done: [
        { label: 'cook dinner' },
        { label: 'go grocery shopping' },
        { label: 'sweep the floors' },
        { label: 'do the laundry' }
      ],
      todo: [
        { label: 'fix the leaky faucet' },
        { label: 'mow the lawn' }
      ]
    };

    this.store.dispatch(
      globalActions.tasksReceived({ workTasks, homeTasks })
    );
  }

  completeAll() {
    this.store.dispatch(globalActions.completeAll());
  }
}
