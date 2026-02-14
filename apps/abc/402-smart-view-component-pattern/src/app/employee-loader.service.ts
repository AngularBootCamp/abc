import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hoursWorked: number;
  hourlyWage: number;
}

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLoader {
  private http = inject(HttpClient);

  getEasternStoreEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(apiUrl + '/employees').pipe(
      map(longList => longList.slice(0, 9)),
      shareReplay(1)
    );
  }

  getWesternStoreEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(apiUrl + '/employees').pipe(
      map(longList => longList.slice(9, 18)),
      shareReplay(1)
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(apiUrl + '/employees').pipe(
      map(longList => longList.slice(1, 18)),
      shareReplay(1)
    );
  }

  getDetails(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(
      `${apiUrl}/employees/${employeeId}`
    );
  }
}
