import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'vst-filter-state-display',
  templateUrl: './filter-state-display.component.html',
  styleUrl: './filter-state-display.component.scss',
  imports: [DatePipe]
})
export class FilterStateDisplayComponent {
  filterForm = inject(DashboardService).filterForm;
}
