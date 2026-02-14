import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { Task } from '../../types';

import { HomeTaskListService } from './home-task-list.service';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  styleUrl: '../notification-manager.component.scss',
  imports: [MatListModule, AsyncPipe]
})
export class HomeTaskListComponent {
  private positionListService = inject(HomeTaskListService);

  done = this.positionListService.done;
  todo = this.positionListService.todo;

  homeTask(task: Task, complete: boolean) {
    this.positionListService.setHomeTask(task, complete);
  }
}
