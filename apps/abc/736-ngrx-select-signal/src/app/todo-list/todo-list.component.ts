import {
  ChangeDetectionStrategy,
  Component,
  input,
  output
} from '@angular/core';

import { Task } from '../types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoListComponent {
  public readonly list = input<Task[]>([]);
  public readonly icon = input('');
  public readonly setTaskStatus = output<Task>();

  protected setStat(task: Task) {
    this.setTaskStatus.emit(task);
  }
}
