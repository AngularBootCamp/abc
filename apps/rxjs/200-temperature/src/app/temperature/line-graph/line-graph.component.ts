import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: []
})
export class LineGraphComponent {
  @Input({ required: true }) set graphData(graphdata: number[]) {
    if (graphdata) {
      // Invert data since positive y is down
      this.points = graphdata.map(i => -1 * i);
      this.lines = this.points
        .map((v, i) => ({ start: v, end: this.points[i + 1] }))
        .slice(0, this.points.length - 1);
    }
  }
  points: number[] = [];
  lines: { start: number; end: number }[] = [];
  height = 200;
  width = 1000;
  intervalSpacing = 10;
}
