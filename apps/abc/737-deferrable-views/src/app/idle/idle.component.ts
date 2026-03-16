import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-idle',
  template: ` <p>I was loaded when the browser was idle</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdleComponent {}
