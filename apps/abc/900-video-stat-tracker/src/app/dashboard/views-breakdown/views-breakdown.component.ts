import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FilterStateDisplayComponent } from './filter-state-display/filter-state-display.component';
import { GraphService } from './graph.service';

@Component({
  selector: 'vst-views-breakdown',
  templateUrl: './views-breakdown.component.html',
  styleUrl: './views-breakdown.component.scss',
  imports: [
    FilterStateDisplayComponent,
    BarChartComponent,
    AsyncPipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewsBreakdownComponent {
  protected readonly graphData = inject(GraphService).graphData;
}
