import { Component, Input } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { FxQuote } from '../fx-quote';

@Component({
  selector: 'app-pair-list-view',
  templateUrl: './pair-list-view.component.html',
  imports: [MatTableModule]
})
export class PairListViewComponent {
  @Input({ required: true }) list!: FxQuote[];

  tableColumns = ['pair', 'bid'];
}
