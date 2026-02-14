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
  protected readonly employees$ = inject(
    EmployeeLoaderService
  ).loadEmployees();
}
