import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { HomeTaskListService } from './home-task-list/home-task-list.service';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';
import { WorkTaskListService } from './work-task-list/work-task-list.service';

@Component({
  selector: 'app-notification-manager',
  templateUrl: './notification-manager.component.html',
  styleUrl: './notification-manager.component.scss',
  imports: [WorkTaskListComponent, HomeTaskListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationManagerComponent {
  private readonly workTaskListService = inject(WorkTaskListService);
  private readonly homeTaskListService = inject(HomeTaskListService);

  protected completeAll() {
    this.homeTaskListService.completeAll();
    this.workTaskListService.completeAll();
  }
}
