import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { FxQuote } from '../fx-quote';
import { PairHistoryChartComponent } from '../pair-history-chart/pair-history-chart.component';

@Component({
  selector: 'app-pair-history-view',
  templateUrl: './pair-history-view.component.html',
  imports: [PairHistoryChartComponent, MatTableModule, DatePipe]
})
export class PairHistoryViewComponent {
  @Input({ required: true }) latestQuotes!: FxQuote[];
  @Input({ required: true }) pair!: string;

  tableColumns = ['time', 'bid'];
}
