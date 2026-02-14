import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { Task } from '../../types';
import { taskPageActions } from '../tasks.actions';
import { selectTodo } from '../tasks.selectors';
import { TodoListComponent } from '../todo-list/todo-list.component';

@Component({
  selector: 'app-todo-tasks',
  template: `
    <app-todo-list
      [list]="(done | async) ?? []"
      selected="false"
      (setTaskStatus)="task($event)"
    />
  `,
  imports: [TodoListComponent, AsyncPipe]
})
export class TodoTasksComponent {
  private store = inject(Store);

  done = this.store.select(selectTodo);

  task(task: Task) {
    this.store.dispatch(taskPageActions.taskCompleted({ task }));
  }
}
