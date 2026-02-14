import {
  Component,
  output,
  input,
  ChangeDetectionStrategy
} from '@angular/core';
// import { FormControl } from '@angular/forms';

import { EmployeeDisplayComponent } from '../employee-display/employee-display.component';
import { Employee } from '../employee-loader.service';

@Component({
  selector: 'app-employee-explorer',
  templateUrl: './employee-explorer.component.html',
  styleUrl: './employee-explorer.component.scss',
  imports: [EmployeeDisplayComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeExplorerComponent {
  // Note that this one isn't required -- the default value is used in
  // one place.
  readonly title = input('Employees');
  readonly employees = input.required<Employee[]>();
  readonly selectedEmployees = input.required<Employee[]>();
  readonly employeeClicked = output<Employee>();

  // Implementing a new feature in this view component improves
  // everywhere that it is used. In this case, all three lists of
  // employees are made searchable by adding this feature. Make sure to
  // update the employee-explorer.component.html as well to see it in
  // action filter = new FormControl('');

  employeeIsSelected(emp: Employee) {
    return this.selectedEmployees().find(e => e.id === emp.id);
  }

  // filteredList() {
  //   if (!this.employees()) {
  //     return [];
  //   }
  //   return this.employees().filter(e =>
  //     e.firstName.toLowerCase().includes(this.filter.value.toLowerCase()) ||
  //     e.lastName.toLowerCase().includes(this.filter.value.toLowerCase()));
  // }
}
