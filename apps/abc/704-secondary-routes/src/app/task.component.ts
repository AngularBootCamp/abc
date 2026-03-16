import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task',
  template: `<header>Here are some tasks</header>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {}
