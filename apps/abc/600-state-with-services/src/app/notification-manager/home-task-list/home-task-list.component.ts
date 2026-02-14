import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { ToDoListComponent } from '../../todo-list/todo-list.component';
import { Task } from '../../types';

import { HomeTaskListService } from './home-task-list.service';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  imports: [ToDoListComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeTaskListComponent {
  private homeTaskListService = inject(HomeTaskListService);

  done = this.homeTaskListService.done;
  todo = this.homeTaskListService.todo;

  checkbox = 'check_box';
  outline = 'check_box_outline_blank';

  setStatus(task: Task, complete: boolean) {
    this.homeTaskListService.setTaskStatus(task, complete);
  }
}
