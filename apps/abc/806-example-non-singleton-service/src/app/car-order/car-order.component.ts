import { Component } from '@angular/core';

import { AxleSelectorComponent } from '../axle-selector/axle-selector.component';
import { CarStateService } from '../car-state.service';
import { ValidityDisplayComponent } from '../validity-display/validity-display.component';
import { WheelSelectorComponent } from '../wheel-selector/wheel-selector.component';

@Component({
  selector: 'app-car-order',
  templateUrl: './car-order.component.html',
  providers: [CarStateService],
  imports: [
    AxleSelectorComponent,
    WheelSelectorComponent,
    ValidityDisplayComponent
  ]
})
export class CarOrderComponent {}
