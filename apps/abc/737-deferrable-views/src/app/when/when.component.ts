import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-when',
  template: ` <p>I was loaded after the condition was met</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhenComponent {}
