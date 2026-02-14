import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';

import { CarStateService } from '../car-state.service';

@Component({
  selector: 'app-axle-selector',
  templateUrl: './axle-selector.component.html',
  imports: [AsyncPipe]
})
export class AxleSelectorComponent {
  private carStateService = inject(CarStateService);

  n = this.carStateService.state.pipe(
    map(carState => carState.nAxles)
  );

  more() {
    this.carStateService.changeAxles(1);
  }

  less() {
    this.carStateService.changeAxles(-1);
  }
}
