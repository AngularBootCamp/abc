import { AsyncPipe } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import {
  bufferCount,
  concat,
  filter,
  map,
  Observable,
  range
} from 'rxjs';

import { FxDataService } from '../fx-data.service';
import { FxQuote, placeholderQuote } from '../fx-quote';
import { PairHistoryViewComponent } from '../pair-history-view/pair-history-view.component';

@Component({
  selector: 'app-pair-history',
  templateUrl: './pair-history.component.html',
  imports: [PairHistoryViewComponent, AsyncPipe]
})
export class PairHistoryComponent {
  @Input({ required: true }) pair!: string;

  latest: Observable<FxQuote[]>;

  constructor() {
    const fxDataService = inject(FxDataService);

    this.latest = concat(
      range(1, 10).pipe(map(_v => placeholderQuote)),
      fxDataService.fxData.pipe(filter(fx => fx.symbol === this.pair))
    ).pipe(bufferCount(10, 1));
  }
}
