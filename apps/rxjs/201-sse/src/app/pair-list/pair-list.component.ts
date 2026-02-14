import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map, Observable, scan } from 'rxjs';

import { FxDataService } from '../fx-data.service';
import { FxQuote } from '../fx-quote';
import { PairListViewComponent } from '../pair-list-view/pair-list-view.component';

@Component({
  selector: 'app-pair-list',
  templateUrl: './pair-list.component.html',
  imports: [PairListViewComponent, AsyncPipe]
})
export class PairListComponent {
  latestQuoteForEachSymbol: Observable<FxQuote[]>;

  constructor() {
    const fxDataService = inject(FxDataService);

    this.latestQuoteForEachSymbol = fxDataService.fxData.pipe(
      scan(
        (acc: Map<string, FxQuote>, curr: FxQuote) =>
          acc.set(curr.symbol, curr),
        new Map<string, FxQuote>()
      ),
      map(acc => Array.from(acc.values()))
    );
  }
}
