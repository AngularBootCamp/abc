import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  signal
} from '@angular/core';

import {
  Employee,
  EmployeeLoaderService
} from './employee-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  protected readonly employees = signal<Employee[]>([]);
  protected readonly loading = signal(true);

  private readonly subscription = inject(EmployeeLoaderService)
    .loadEmployees()
    .subscribe(employees => {
      this.loading.set(false);
      this.employees.set(employees);
    });

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
