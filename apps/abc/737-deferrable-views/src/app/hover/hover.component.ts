import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-hover',
  template: ` <p>Thank you for hovering!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HoverComponent {}
