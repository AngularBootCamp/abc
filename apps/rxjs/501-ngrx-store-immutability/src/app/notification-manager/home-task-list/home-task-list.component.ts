import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';

import {
  homeTaskActions,
  selectDoneHome,
  selectTodoHome
} from '../../home-task.state';
import { Task } from '../../types';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  imports: [MatListModule, AsyncPipe]
})
export class HomeTaskListComponent {
  private store = inject(Store);

  done = this.store.select(selectDoneHome);
  todo = this.store.select(selectTodoHome);

  taskCompleted(task: Task) {
    this.store.dispatch(homeTaskActions.taskCompleted({ task }));
  }

  taskReset(task: Task) {
    this.store.dispatch(homeTaskActions.taskReset({ task }));
  }
}
