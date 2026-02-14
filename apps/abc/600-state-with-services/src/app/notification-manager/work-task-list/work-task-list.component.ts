import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ToDoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../../types';

import { WorkTaskListService } from './work-task-list.service';

/*
  Components now pass and receive information between itself
  and services
*/
@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html',
  imports: [ToDoListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkTaskListComponent {
  private readonly workTaskListService = inject(WorkTaskListService);

  protected readonly done = toSignal(this.workTaskListService.done, {
    initialValue: []
  });
  protected readonly todo = toSignal(this.workTaskListService.todo, {
    initialValue: []
  });

  protected setStatus(task: Task, complete: boolean) {
    this.workTaskListService.setTaskStatus(task, complete);
  }
}
