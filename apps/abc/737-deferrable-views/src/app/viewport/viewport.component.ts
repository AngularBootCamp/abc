import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-viewport',
  template: ` <p>I was loaded when I was scrolled into the viewport</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewportComponent {}
