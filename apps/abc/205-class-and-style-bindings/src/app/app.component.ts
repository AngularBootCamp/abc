import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';

import { regionRecords } from './records';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  // Pretend we're loading data from an external source.
  protected regionInfo = signal(regionRecords);

  // Whenever the region data changes, recalculate the scale factors
  // based on the maximum values for units and total revenue, in order
  // to keep the bars on the chart a reasonable width.
  protected scaleFactors = computed(() => {
    let maxUnits = 0;
    let maxTotalRevenue = 0;

    this.regionInfo()
      .flatMap(rr => rr.saleRecords)
      .forEach(({ units, totalRevenue }) => {
        maxUnits = Math.max(units, maxUnits);
        maxTotalRevenue = Math.max(totalRevenue, maxTotalRevenue);
      });

    return {
      units: 100 / maxUnits,
      totalRevenue: 100 / maxTotalRevenue
    };
  });
}
