import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DashboardService } from '../dashboard.service';

// Unlike the top-list component, this one is tightly coupled
// to the service. This approach is helpful for more complex features
// that do not lend themselves well to reuse.
@Component({
  selector: 'vst-views-filter',
  templateUrl: './views-filter.component.html',
  styleUrl: './views-filter.component.scss',
  imports: [ReactiveFormsModule]
})
export class ViewsFilterComponent {
  filterFormGroup = inject(DashboardService).filterForm;
}
