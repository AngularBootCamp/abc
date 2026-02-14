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
  private carStateService = inject(CarStateService);

  // If you need to combine synchronous and asynchronous data
  // in the template, do it in TypeScript.
  typesAndQtys = this.carStateService.state.pipe(
    map(carState =>
      carState.wheelQtys.map((q, index) => ({
        wt: wheelTypes[index],
        q
      }))
    )
  );

  more(i: number) {
    this.carStateService.changeWheelQty(i, 1);
  }

  less(i: number) {
    this.carStateService.changeWheelQty(i, -1);
  }
}
