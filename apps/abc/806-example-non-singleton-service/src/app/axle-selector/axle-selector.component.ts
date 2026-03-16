import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';

import { map } from 'rxjs';

import { CarStateService } from '../car-state.service';

@Component({
  selector: 'app-axle-selector',
  templateUrl: './axle-selector.component.html',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AxleSelectorComponent {
  private readonly carStateService = inject(CarStateService);

  protected readonly n = this.carStateService.state.pipe(
    map(carState => carState.nAxles),
  );

  protected more() {
    this.carStateService.changeAxles(1);
  }

  protected less() {
    this.carStateService.changeAxles(-1);
  }
}
