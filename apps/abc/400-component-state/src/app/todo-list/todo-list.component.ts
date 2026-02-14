import {
  Component,
  output,
  input,
  ChangeDetectionStrategy
} from '@angular/core';

import { Task } from '../types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  readonly list = input.required<Task[]>();
  readonly icon = input.required<string>();

  readonly toggleTask = output<Task>();

  toggle(task: Task) {
    this.toggleTask.emit(task);
  }
}
