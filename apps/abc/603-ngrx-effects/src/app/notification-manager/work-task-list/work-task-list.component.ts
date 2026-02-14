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
} from '../../work-tasks.state';

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

  protected workTask(task: Task, complete: boolean) {
    this.store.dispatch(
      workTaskActions.setWorkTask({ task, complete })
    );
  }
}
