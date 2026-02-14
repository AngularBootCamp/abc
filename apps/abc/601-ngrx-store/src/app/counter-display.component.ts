import { Component, output, input } from '@angular/core';

@Component({
  selector: 'app-counter-display',
  templateUrl: './counter-display.component.html'
})
export class CounterDisplayComponent {
  readonly label = input.required<string>();
  readonly counter = input.required<number>();
  readonly pick = output<number>();
}
