import { Injectable, inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable, catchError, map, of } from 'rxjs';

import { Employee } from './employee';
import { environment } from './environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private readonly http = inject(HttpClient);

  getList(): Observable<string[]> {
    return this.http.get<Employee[]>(apiUrl + '/employees').pipe(
      map(employees => employees.map(e => e.firstName)),
      map(names => names.sort()),
      catchError(err => {
        console.error('handling error within getEmployees()', err);
        const mockEmployees = ['no employees could be loaded'];
        return of(mockEmployees);
      }),
    );
  }
}
