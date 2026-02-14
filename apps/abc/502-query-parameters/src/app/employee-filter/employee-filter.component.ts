import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  startWith
} from 'rxjs';

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeFilterComponent implements OnDestroy {
  private router = inject(Router);

  employeeFilter: FormControl<string | null>;
  subscription: Subscription;

  constructor() {
    const route = inject(ActivatedRoute);

    const employeeFilterDefaultValue =
      route.snapshot.queryParamMap.get('employeeFilter');
    this.employeeFilter = new FormControl(employeeFilterDefaultValue);

    this.subscription = this.employeeFilter.valueChanges
      .pipe(
        startWith(this.employeeFilter.value),
        debounceTime(250),
        distinctUntilChanged()
      )
      .subscribe(filterText => {
        const queryParams = {
          employeeFilter: filterText || undefined
        };
        void this.router.navigate([], {
          queryParams,
          queryParamsHandling: 'merge'
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
