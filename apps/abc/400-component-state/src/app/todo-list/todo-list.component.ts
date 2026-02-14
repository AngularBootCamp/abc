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
  public readonly list = input.required<Task[]>();
  public readonly icon = input.required<string>();

  public readonly toggleTask = output<Task>();

  protected toggle(task: Task) {
    this.toggleTask.emit(task);
  }
}
