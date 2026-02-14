import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { EmployeeLoader } from '../employee-loader.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [RouterLink, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class EmployeeListComponent {
  protected readonly list = inject(EmployeeLoader).getList();
}
