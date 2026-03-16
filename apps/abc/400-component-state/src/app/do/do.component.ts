import { ChangeDetectionStrategy, Component } from '@angular/core';

import { HomeTaskListComponent } from './home-task-list/home-task-list.component';
import { WorkTaskListComponent } from './work-task-list/work-task-list.component';

@Component({
  selector: 'app-do',
  templateUrl: './do.component.html',
  imports: [WorkTaskListComponent, HomeTaskListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DoComponent {}
