import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-multiple',
  template: ` <p>I was loaded for any of a number of reasons!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleComponent {}
