import { Component, input, output } from '@angular/core';

import { Task } from '../types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
  readonly list = input<Task[]>([]);
  readonly icon = input('');

  readonly setTaskStatus = output<Task>();

  setStat(task: Task) {
    this.setTaskStatus.emit(task);
  }
}
