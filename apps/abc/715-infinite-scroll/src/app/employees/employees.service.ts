import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  hoursWorked: number;
  hourlyWage: number;
}

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

const pageSize = 10;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly http = inject(HttpClient);

  loadEmployees(pageIndex: number) {
    const params = {
      _start: pageIndex * pageSize,
      _limit: pageSize
    };

    return this.http.get<Employee[]>(apiUrl + '/employees/', {
      params
    });
  }
}
