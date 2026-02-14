import { Component, inject } from '@angular/core';

import { HomeTaskStore } from '../home-tasks.state';
import { ModalService } from '../modal.service';
import { WorkTaskStore } from '../work-tasks.state';

import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrl: './notification-manager.component.scss',
  imports: [WorkTaskListComponent, HomeTaskListComponent]
})
export class NotificationManagerComponent {
  private readonly homeTaskStore = inject(HomeTaskStore);
  private readonly workTaskStore = inject(WorkTaskStore);
  private readonly modalSvc = inject(ModalService);

  completeAll() {
    if (this.modalSvc.confirm('Are you sure?')) {
      this.homeTaskStore.completeAll();
      this.workTaskStore.completeAll();
    }
  }
}
