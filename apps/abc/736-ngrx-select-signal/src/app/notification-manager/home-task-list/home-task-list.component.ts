import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import {
  selectDoneHome,
  selectTodoHome,
  homeTaskActions
} from '../../home-tasks.state';
import { TodoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../../types';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  imports: [TodoListComponent]
})
export class HomeTaskListComponent {
  private store = inject(Store);

  done = this.store.selectSignal(selectDoneHome);
  todo = this.store.selectSignal(selectTodoHome);

  checkbox = 'check_box';
  outline = 'check_box_outline_blank';

  homeTask(task: Task, complete: boolean) {
    this.store.dispatch(
      homeTaskActions.setHomeTask({ task, complete })
    );
  }
}
