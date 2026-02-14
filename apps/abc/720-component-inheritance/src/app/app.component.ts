import { Component, signal } from '@angular/core';

import { EmployeeGridComponent } from './employee-grid.component';
import { EmployeeListComponent } from './employee-list.component';
import { Employee } from './interfaces';

const employees: Employee[] = [
  {
    id: 1,
    firstName: 'Henry',
    lastName: 'Holmes',
    email: 'hholmes0@goodreads.com',
    hoursWorked: 29,
    hourlyWage: 19
  },
  {
    id: 2,
    firstName: 'Harold',
    lastName: 'Cox',
    email: 'hcox1@who.int',
    hoursWorked: 18,
    hourlyWage: 11
  },
  {
    id: 3,
    firstName: 'Brian',
    lastName: 'Garcia',
    email: 'bgarcia2@addthis.com',
    hoursWorked: 4,
    hourlyWage: 17
  },
  {
    id: 4,
    firstName: 'Patricia',
    lastName: 'Young',
    email: 'pyoung3@wix.com',
    hoursWorked: 47,
    hourlyWage: 12
  },
  {
    id: 5,
    firstName: 'Jose',
    lastName: 'Jacobs',
    email: 'jjacobs4@prweb.com',
    hoursWorked: 45,
    hourlyWage: 12
  },
  {
    id: 6,
    firstName: 'Rachel',
    lastName: 'Carter',
    email: 'rcarter5@t.co',
    hoursWorked: 34,
    hourlyWage: 17
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [EmployeeListComponent, EmployeeGridComponent]
})
export class AppComponent {
  showList = signal(true);
  myEmployees = signal(employees);

  toggleView() {
    this.showList.update(s => !s);
  }

  logEmployee(employee: Employee) {
    console.log(employee);
  }
}
