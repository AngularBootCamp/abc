import {
  ChangeDetectionStrategy,
  Component,
  signal
} from '@angular/core';

import { TodoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../../types';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  imports: [TodoListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTaskListComponent {
  protected readonly done = signal<Task[]>([
    { label: 'cook dinner' },
    { label: 'go grocery shopping' },
    { label: 'sweep the floors' },
    { label: 'do the laundry' }
  ]);

  protected readonly todo = signal<Task[]>([
    { label: 'fix the leaky faucet' },
    { label: 'mow the lawn' }
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
