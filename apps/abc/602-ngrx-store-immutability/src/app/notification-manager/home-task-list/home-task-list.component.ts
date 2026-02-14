import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  selectDoneHome,
  selectTodoHome,
  homeTaskActions
} from '../../home-task.state';
import { TodoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../../types';

// Components now pass and receive information between themselves
// and the store.

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  imports: [TodoListComponent, AsyncPipe]
})
export class HomeTaskListComponent {
  private store = inject(Store);

  done = this.store.select(selectDoneHome);
  todo = this.store.select(selectTodoHome);

  checkbox = 'check_box';
  outline = 'check_box_outline_blank';

  taskCompleted(task: Task) {
    this.store.dispatch(homeTaskActions.taskCompleted({ task }));
  }

  taskReset(task: Task) {
    this.store.dispatch(homeTaskActions.taskReset({ task }));
  }
}
