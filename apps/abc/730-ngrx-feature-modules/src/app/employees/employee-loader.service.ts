import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

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

  getList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(apiUrl + '/employees');
  }
}
