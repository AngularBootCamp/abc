import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { HomeTaskListService } from './home-task-list/home-task-list.service';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';
import { WorkTaskListService } from './work-task-list/work-task-list.service';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrl: './notification-manager.component.scss',
  imports: [
    WorkTaskListComponent,
    HomeTaskListComponent,
    MatButtonModule
  ]
})
export class NotificationManagerComponent {
  private workTaskListService = inject(WorkTaskListService);
  private homeTaskListService = inject(HomeTaskListService);

  completeAll() {
    this.homeTaskListService.completeAll();
    this.workTaskListService.completeAll();
  }
}
