import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { generalActions } from '../state';

import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrl: './notification-manager.component.scss',
  imports: [WorkTaskListComponent, HomeTaskListComponent]
})
export class NotificationManagerComponent {
  private store = inject(Store);

  completeAll() {
    this.store.dispatch(generalActions.completeAll());
  }
}
