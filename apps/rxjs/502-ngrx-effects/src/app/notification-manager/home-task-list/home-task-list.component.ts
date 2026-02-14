import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Store } from '@ngrx/store';

import {
  selectDoneHome,
  selectTodoHome,
  homeTaskActions
} from '../../home-tasks.state';
import { Task } from '../../types';

@Component({
  selector: 'app-home-task-list',
  templateUrl: './home-task-list.component.html',
  styleUrl: '../notification-manager.component.scss',
  imports: [MatListModule, AsyncPipe]
})
export class HomeTaskListComponent {
  private store = inject(Store);

  done = this.store.select(selectDoneHome);
  todo = this.store.select(selectTodoHome);

  homeTask(task: Task, complete: boolean) {
    this.store.dispatch(
      homeTaskActions.setHomeTask({ task, complete })
    );
  }
}
