import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { LineGraphComponent } from '../line-graph/line-graph.component';
import { TemperatureService } from '../temperature.service';

@Component({
  selector: 'app-temperature-graph',
  templateUrl: './temperature-graph.component.html',
  imports: [MatCardModule, LineGraphComponent, AsyncPipe]
})
export class TemperatureGraphComponent {
  private ts = inject(TemperatureService);

  graphData = this.ts.temperatureHistory;
}
