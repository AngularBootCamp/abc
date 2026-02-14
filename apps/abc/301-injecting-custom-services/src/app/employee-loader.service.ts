import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
}

@Injectable({
  // This service should be created
  // by the root application injector.
  providedIn: 'root'
})
export class EmployeeLoaderService {
  private http = inject(HttpClient);

  loadEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(apiUrl + '/employees');
  }
}
