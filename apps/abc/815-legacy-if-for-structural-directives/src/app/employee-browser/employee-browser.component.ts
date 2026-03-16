/* eslint-disable @typescript-eslint/no-deprecated, @typescript-eslint/no-restricted-imports
-- This is an example of legacy code
*/
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';

const employees = [
  {
    name: 'Cynthia Cunningham',
    roles: ['moderator', 'infrastructure', 'firmware'],
  },
  { name: 'Peter Clark', roles: ['contingency', 'protocol'] },
  { name: 'Theresa Soto', roles: ['implementation'] },
  {
    name: 'Russell Fisher',
    roles: ['implementation', 'application'],
  },
  { name: 'Elizabeth Hudson', roles: ['instruction set design'] },
  { name: 'Heather Spencer', roles: ['moderator'] },
  { name: 'Barbara Tran', roles: ['protocol'] },
  {
    name: 'Julia Anderson',
    roles: ['instruction set design', 'implementation'],
  },
];

@Component({
  selector: 'app-employee-browser',
  templateUrl: './employee-browser.component.html',
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EmployeeBrowserComponent {
  protected employeeList = employees;
  protected showInactiveRoles = true;
}
