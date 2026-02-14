import {
  booleanAttribute,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { Task } from '../../types';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  imports: [MatListModule]
})
export class TodoListComponent {
  @Input({ required: true }) list!: Task[];
  @Input({ required: true, transform: booleanAttribute })
  selected!: boolean;

  @Output() setTaskStatus = new EventEmitter<Task>();

  setStat(task: Task) {
    this.setTaskStatus.emit(task);
  }
}
