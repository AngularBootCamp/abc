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
} from '../../home-tasks.state';
import { TodoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../../types';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  imports: [TodoListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTaskListComponent {
  private readonly store = inject(Store);

  protected readonly done = this.store.selectSignal(selectDoneHome);
  protected readonly todo = this.store.selectSignal(selectTodoHome);

  protected homeTask(task: Task, complete: boolean) {
    this.store.dispatch(
      homeTaskActions.setHomeTask({ task, complete })
    );
  }
}
