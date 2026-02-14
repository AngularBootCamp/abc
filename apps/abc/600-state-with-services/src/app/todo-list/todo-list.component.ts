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
export class ToDoListComponent {
  readonly list = input.required<Task[]>();
  readonly icon = input.required<string>();
  readonly setTaskStatus = output<Task>();

  setStatus(task: Task) {
    this.setTaskStatus.emit(task);
  }
}
