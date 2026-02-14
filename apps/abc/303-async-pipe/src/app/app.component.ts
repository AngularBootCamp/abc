import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { EmployeeLoaderService } from './employee-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  employees$ = inject(EmployeeLoaderService).loadEmployees();
}
