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
  employees = signal<Employee[]>([]);
  loading = signal(true);

  subscription = inject(EmployeeLoaderService)
    .loadEmployees()
    .subscribe(employees => {
      this.loading.set(false);
      this.employees.set(employees);
    });

  // Since this component doesn't know the "source" of the observable,
  // it is a good practice to perform "clean-up" on it via the OnDestroy
  // hook.
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
