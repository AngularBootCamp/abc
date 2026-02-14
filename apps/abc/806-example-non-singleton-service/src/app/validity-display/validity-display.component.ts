import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { CarStateService } from '../car-state.service';

@Component({
  selector: 'app-validity-display',
  templateUrl: './validity-display.component.html',
  imports: [AsyncPipe]
})
export class ValidityDisplayComponent {
  ok: Observable<boolean>;
  message: Observable<string>;

  constructor() {
    const carStateService = inject(CarStateService);

    this.ok = carStateService.state.pipe(
      map(carState => carState.ok)
    );
    this.message = carStateService.state.pipe(
      map(carState => (carState.message ? carState.message : 'ok!'))
    );
  }
}
