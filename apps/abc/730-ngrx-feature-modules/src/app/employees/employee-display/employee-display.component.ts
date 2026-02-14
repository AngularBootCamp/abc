import { Component, input } from '@angular/core';

import { Employee } from '../employee-loader.service';

@Component({
  selector: 'app-employee-display',
  template: '{{ employee().firstName }} {{ employee().lastName}}'
})
export class EmployeeDisplayComponent {
  readonly employee = input.required<Employee>();
}
