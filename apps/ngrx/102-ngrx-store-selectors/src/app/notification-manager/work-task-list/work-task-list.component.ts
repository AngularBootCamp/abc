import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';

import { Task } from '../../types';
import {
  selectDoneWork,
  selectTodoWork,
  workTaskActions
} from '../../work-task.state';

// Components now pass and receive information between itself
// and the store.

@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html',
  imports: [MatListModule, AsyncPipe]
})
export class WorkTaskListComponent {
  private store = inject(Store);

  done = this.store.select(selectDoneWork);
  todo = this.store.select(selectTodoWork);

  taskCompleted(task: Task) {
    this.store.dispatch(workTaskActions.taskCompleted({ task }));
  }

  taskReset(task: Task) {
    this.store.dispatch(workTaskActions.taskReset({ task }));
  }
}
