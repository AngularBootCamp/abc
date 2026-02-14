import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { delay, tap } from 'rxjs';

import { EmployeeLoaderService } from './employee-loader.service';

export function EmployeeResolver(route: ActivatedRouteSnapshot) {
  const loader = inject(EmployeeLoaderService);
  console.log('started retrieving employee');
  const employeeId = route.paramMap.get('employeeId') as string;
  return loader.getDetails(employeeId).pipe(
    delay(3000), // Simulate backend latency
    tap(x => console.log('employee information arrived', x))
  );
}
