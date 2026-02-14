import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { Employee } from '../employee';

@Component({
  selector: 'app-employee-detail-view',
  templateUrl: './employee-detail-view.component.html',
  imports: [MatCardModule]
})
export class EmployeeDetailComponent {
  @Input({ required: true }) employee: Employee | undefined;
}
