import {
  Component,
  OnDestroy,
  effect,
  inject,
  input
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  imports: [ReactiveFormsModule]
})
export class EmployeeFilterComponent implements OnDestroy {
  readonly filterTerm = input.required<string | undefined>();

  private router = inject(Router);

  filter = new FormControl();

  private controlSub = this.filter.valueChanges
    .pipe(debounceTime(300), distinctUntilChanged())
    .subscribe(searchTerm => {
      // If filter is an empty string, replace with undefined.
      // This avoids having an empty key-value pair in the URL.
      const filter = searchTerm || undefined;
      const queryParams = { filter };
      this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge'
      });
    });

  constructor() {
    effect(() => {
      const val = this.filterTerm();

      console.log({ val });

      if (val !== undefined) {
        this.filter.setValue(val);
        this.filter.enable();
      } else {
        // Disable the control until the term arrives
        // to prevent user input from being thrown away.
        this.filter.disable();
      }
    });
  }

  ngOnDestroy() {
    this.controlSub.unsubscribe();
  }
}
