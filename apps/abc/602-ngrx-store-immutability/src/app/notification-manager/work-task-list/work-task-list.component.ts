import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { Store } from '@ngrx/store';

import { TodoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../../types';
import {
  selectDoneWork,
  selectTodoWork,
  workTaskActions
} from '../../work-task.state';

// Components now pass and receive information between themselves
// and the store.

@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html',
  imports: [TodoListComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkTaskListComponent {
  private readonly store = inject(Store);

  protected readonly done = this.store.select(selectDoneWork);
  protected readonly todo = this.store.select(selectTodoWork);

  protected taskCompleted(task: Task) {
    this.store.dispatch(workTaskActions.taskCompleted({ task }));
  }

  protected taskReset(task: Task) {
    this.store.dispatch(workTaskActions.taskReset({ task }));
  }
}
