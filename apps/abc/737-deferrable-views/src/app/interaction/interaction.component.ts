import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-interaction',
  template: ` <p>Thank you for interacting!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InteractionComponent {}
