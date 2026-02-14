import {
  Component,
  output,
  input,
  ChangeDetectionStrategy
} from '@angular/core';

import { TodoListComponent } from '../../todo-list/todo-list.component';
import { Task, TaskToggle } from '../../types';

// Notice that the component becomes a passthrough. Why not just remove
// the component? Why use multiple components at all?

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  imports: [TodoListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTaskListComponent {
  public readonly done = input.required<Task[]>();
  public readonly todo = input.required<Task[]>();
  public readonly toggleTask = output<TaskToggle>();

  protected toggle(outputTask: Task, outputComplete: boolean) {
    this.toggleTask.emit({
      task: outputTask,
      complete: outputComplete
    });
  }
}
