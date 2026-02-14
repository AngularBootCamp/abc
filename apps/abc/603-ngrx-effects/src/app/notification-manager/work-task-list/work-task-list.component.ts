import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { TodoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../../types';
import {
  selectDoneWork,
  selectTodoWork,
  workTaskActions
} from '../../work-tasks.state';

@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html',
  imports: [TodoListComponent, AsyncPipe]
})
export class WorkTaskListComponent {
  private store = inject(Store);

  done = this.store.select(selectDoneWork);
  todo = this.store.select(selectTodoWork);

  checkbox = 'check_box';
  outline = 'check_box_outline_blank';

  workTask(task: Task, complete: boolean) {
    this.store.dispatch(
      workTaskActions.setWorkTask({ task, complete })
    );
  }
}
