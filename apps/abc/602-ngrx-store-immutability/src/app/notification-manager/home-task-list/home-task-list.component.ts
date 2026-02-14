import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
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
  imports: [TodoListComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTaskListComponent {
  private readonly store = inject(Store);

  protected readonly done = this.store.select(selectDoneHome);
  protected readonly todo = this.store.select(selectTodoHome);

  protected taskCompleted(task: Task) {
    this.store.dispatch(homeTaskActions.taskCompleted({ task }));
  }

  protected taskReset(task: Task) {
    this.store.dispatch(homeTaskActions.taskReset({ task }));
  }
}
