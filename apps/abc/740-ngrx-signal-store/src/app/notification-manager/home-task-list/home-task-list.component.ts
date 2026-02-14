import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { HomeTaskStore } from '../../home-tasks.state';
import { TodoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../../types';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  imports: [TodoListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTaskListComponent {
  private readonly store = inject(HomeTaskStore);

  protected readonly done = this.store.doneHome;
  protected readonly todo = this.store.todoHome;

  protected homeTask(task: Task, complete: boolean) {
    this.store.setHomeState(task, complete);
  }
}
