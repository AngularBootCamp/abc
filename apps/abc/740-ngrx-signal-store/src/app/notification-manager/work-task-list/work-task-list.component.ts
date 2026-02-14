import { Component, inject } from '@angular/core';

import { TodoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../../types';
import { WorkTaskStore } from '../../work-tasks.state';

@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html',
  imports: [TodoListComponent]
})
export class WorkTaskListComponent {
  private readonly store = inject(WorkTaskStore);
  done = this.store.doneWork;
  todo = this.store.todoWork;

  checkbox = 'check_box';
  outline = 'check_box_outline_blank';

  workTask(task: Task, complete: boolean) {
    this.store.setWorkState(task, complete);
  }
}
