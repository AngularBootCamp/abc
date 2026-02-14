import {
  Component,
  input,
  numberAttribute,
  output
} from '@angular/core';

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
  `
})
export class ScoreComponent {
  readonly value = input.required<number, unknown>({
    transform: numberAttribute
  });
  readonly notify = output<string>();

  onNotify() {
    this.notify.emit('Your score was ' + this.value());
  }
}
