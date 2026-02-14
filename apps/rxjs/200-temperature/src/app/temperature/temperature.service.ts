import { Injectable } from '@angular/core';
import { interval, map, scan, take, tap } from 'rxjs';

const changeRange = 10;

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  // Generate a series of changes
  temperatureChange = interval(100).pipe(
    // Data will probably trend upward
    map(
      () =>
        Math.floor(Math.random() * changeRange) - changeRange / 2 + 1
    ),
    tap(change => console.log(change))
  );

  // Calculate temp based on previous temp and change
  temperature = this.temperatureChange.pipe(
    take(100),
    scan((previous, change) => change + previous, 0),
    tap(temperature => console.log(temperature))
  );

  // Calculate history based on previous history and new value
  temperatureHistory = this.temperature.pipe(
    scan<number, number[]>(
      (history, newTemp) => [...history, newTemp],
      []
    )
  );
}
