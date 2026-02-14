import {
  Component,
  output,
  input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-counter-display',
  templateUrl: './counter-display.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CounterDisplayComponent {
  public readonly label = input.required<string>();
  public readonly counter = input.required<number>();
  public readonly pick = output<number>();
}
