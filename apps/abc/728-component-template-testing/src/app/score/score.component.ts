/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection
-- This older unit testing example assumes zone.js and Default CDS
*/
import { Component, input, numberAttribute, output } from '@angular/core';

@Component({
  selector: 'app-show-score',
  template: `
    <p>
      <strong>
        Your score is:
        <span class="value-display">{{ value() }}</span>
        !
      </strong>
    </p>
    <p>
      <button (click)="onNotify()">Notify</button>
    </p>
  `,
})
export class ScoreComponent {
  public readonly value = input.required<number, unknown>({
    transform: numberAttribute,
  });
  public readonly notify = output<string>();

  protected onNotify() {
    this.notify.emit('Your score was ' + this.value());
  }
}
