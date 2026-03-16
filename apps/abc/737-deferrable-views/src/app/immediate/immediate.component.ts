import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-immediate',
  template: ` <p>I was loaded immediately</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImmediateComponent {}
