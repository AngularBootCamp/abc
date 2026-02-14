import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  imports: [MatCardModule, AsyncPipe]
})
export class EmployeeDetailComponent {
  id: Observable<string>;

  constructor() {
    const route = inject(ActivatedRoute);

    console.log('Creating new instance of EmployeeDetailComponent');
    this.id = route.paramMap.pipe(
      tap(params =>
        console.log(
          'Got new value for param',
          params.get('employeeId')
        )
      ),
      // The only time employeeId would not be defined would be if the developer creates a typo in 'employeeId'
      // OK to assert that the result is a string
      map(params => params.get('employeeId') as string)
    );
  }
}
