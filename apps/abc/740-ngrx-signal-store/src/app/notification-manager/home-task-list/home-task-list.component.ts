import { Component, inject } from '@angular/core';

import { HomeTaskStore } from '../../home-tasks.state';
import { TodoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../../types';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  imports: [TodoListComponent]
})
export class HomeTaskListComponent {
  private readonly store = inject(HomeTaskStore);
  done = this.store.doneHome;
  todo = this.store.todoHome;

  checkbox = 'check_box';
  outline = 'check_box_outline_blank';

  homeTask(task: Task, complete: boolean) {
    this.store.setHomeState(task, complete);
  }
}
