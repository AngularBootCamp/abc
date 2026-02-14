import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe]
})
export class AppComponent {
  team = inject(EmployeeService).getList();
}
