import { Component } from '@angular/core';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { PairHistoryComponent } from './pair-history/pair-history.component';
import { PairListComponent } from './pair-list/pair-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [HeaderComponent, PairHistoryComponent, PairListComponent]
})
export class AppComponent {}
