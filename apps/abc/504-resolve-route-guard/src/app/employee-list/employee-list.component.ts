import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { EmployeeLoaderService } from '../employee-loader.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  imports: [RouterLink, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent {
  list = inject(EmployeeLoaderService).getList();
}
