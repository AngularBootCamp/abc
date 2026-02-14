import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'vst-filter-state-display',
  templateUrl: './filter-state-display.component.html',
  styleUrl: './filter-state-display.component.scss',
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterStateDisplayComponent {
  protected readonly filterForm = inject(DashboardService).filterForm;
}
