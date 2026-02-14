import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';

import { Task } from '../../types';
import {
  selectDoneWork,
  selectTodoWork,
  workTaskActions
} from '../../work-tasks.state';

@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html',
  styleUrl: '../notification-manager.component.scss',
  imports: [MatListModule, AsyncPipe]
})
export class WorkTaskListComponent {
  private store = inject(Store);

  done = this.store.select(selectDoneWork);
  todo = this.store.select(selectTodoWork);

  workTask(task: Task, complete: boolean) {
    this.store.dispatch(
      workTaskActions.setWorkTask({ task, complete })
    );
  }
}
