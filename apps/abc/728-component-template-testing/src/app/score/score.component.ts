import {
  ChangeDetectionStrategy,
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoreComponent {
  public readonly value = input.required<number, unknown>({
    transform: numberAttribute
  });
  public readonly notify = output<string>();

  protected onNotify() {
    this.notify.emit('Your score was ' + this.value());
  }
}
