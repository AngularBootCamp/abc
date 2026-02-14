import { Component, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  imports: [ReactiveFormsModule]
})
export class EmployeeFilterComponent {
  private router = inject(Router);

  employeeFilter: FormControl<string | null>;

  constructor() {
    const route = inject(ActivatedRoute);

    const employeeFilterDefaultValue =
      route.snapshot.queryParamMap.get('employeeFilter');
    this.employeeFilter = new FormControl(employeeFilterDefaultValue);

    const filterText = toSignal(
      this.employeeFilter.valueChanges.pipe(
        startWith(this.employeeFilter.value),
        debounceTime(250),
        distinctUntilChanged()
      )
    );

    // This effect replaces a manual subscription
    effect(() => {
      const queryParams = {
        employeeFilter: filterText() || undefined
      };
      void this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge'
      });
    });
  }
}
