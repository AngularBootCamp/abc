import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-timer',
  template: ` <p>I was loaded after the timer completed</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimerComponent {}
