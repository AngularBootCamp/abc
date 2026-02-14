import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

import { CarStateService, wheelTypes } from '../car-state.service';

@Component({
  selector: 'app-wheel-selector',
  templateUrl: './wheel-selector.component.html',
  styleUrl: './wheel-selector.component.scss',
  imports: [AsyncPipe]
})
export class WheelSelectorComponent {
  private readonly carStateService = inject(CarStateService);

  // If you need to combine synchronous and asynchronous data
  // in the template, do it in TypeScript.
  protected readonly typesAndQtys = this.carStateService.state.pipe(
    map(carState =>
      carState.wheelQtys.map((q, index) => ({
        wt: wheelTypes[index],
        q
      }))
    )
  );

  protected more(i: number) {
    this.carStateService.changeWheelQty(i, 1);
  }

  protected less(i: number) {
    this.carStateService.changeWheelQty(i, -1);
  }
}
