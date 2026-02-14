import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { Task } from '../../types';

import { WorkTaskListService } from './work-task-list.service';

// Components now pass and receive information between itself
// and services.

@Component({
  selector: 'app-work-task-list',
  templateUrl: './work-task-list.component.html',
  styleUrl: '../notification-manager.component.scss',
  imports: [MatListModule, AsyncPipe]
})
export class WorkTaskListComponent {
  private workTaskListService = inject(WorkTaskListService);

  done = this.workTaskListService.done;
  todo = this.workTaskListService.todo;

  workTask(task: Task, complete: boolean) {
    this.workTaskListService.setWorkTask(task, complete);
  }
}
