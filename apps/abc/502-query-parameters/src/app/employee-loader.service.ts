import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Employee } from './employee';

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

@Injectable({
  providedIn: 'root'
})
export class EmployeeLoaderService {
  private http = inject(HttpClient);

  getList(searchText: string): Observable<Employee[]> {
    const params = { q: searchText, _limit: '20' };

    return this.http.get<Employee[]>(apiUrl + '/employees', {
      params
    });
  }

  getDetails(employeeId: string | number): Observable<Employee> {
    return this.http.get<Employee>(
      `${apiUrl}/employees/${employeeId}`
    );
  }
}
