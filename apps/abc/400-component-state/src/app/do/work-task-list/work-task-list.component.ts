import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';

import { TodoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../../types';

@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html',
  imports: [TodoListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkTaskListComponent {
  protected readonly done = signal<Task[]>([
    { label: 'file paperwork' },
    { label: 'send emails' },
    { label: 'work on project A' },
    { label: 'submit report to manager' }
  ]);

  protected readonly todo = signal<Task[]>([
    { label: 'work on project B' },
    { label: 'update task list' }
  ]);

  protected toggleTask(task: Task, complete: boolean) {
    if (complete) {
      this.done.update(arr =>
        arr.filter(curTask => curTask !== task)
      );
      this.todo.update(arr => [...arr, task]);
    } else {
      this.todo.update(arr =>
        arr.filter(curTask => curTask !== task)
      );
      this.done.update(arr => [...arr, task]);
    }
  }
}
