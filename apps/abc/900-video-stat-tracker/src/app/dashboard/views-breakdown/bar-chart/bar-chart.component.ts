import { Component, input } from '@angular/core';

import { GraphData, Rect } from '../graph-helper';

@Component({
  selector: 'vst-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss'
})
export class BarChartComponent {
  readonly graphData = input.required<GraphData | undefined>();

  positionAndSizeOf(rect: Rect) {
    return [rect.x, rect.y, rect.width, rect.height].join(';');
  }
}
