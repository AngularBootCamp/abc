import { Component, signal } from '@angular/core';

import { CarOrderComponent } from './car-order/car-order.component';

// import { CarStateService } from './car-state.service';

interface Car {
  id: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  // ,providers: [CarStateService]
  imports: [CarOrderComponent]
})
export class AppComponent {
  cars = signal<Car[]>([]);

  addOne() {
    this.cars.update(arr => [...arr, { id: arr.length + 1 }]);
  }
}
