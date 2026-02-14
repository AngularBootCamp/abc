import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, catchError, map } from 'rxjs';

import { Employee } from './employee';
import { environment } from './environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private http = inject(HttpClient);

  getList(): Observable<string[]> {
    return this.http.get<Employee[]>(apiUrl + '/employees').pipe(
      map(employees => employees.map(e => e.firstName)),
      map(names => names.sort()),
      catchError(err => {
        console.error('handling error within getEmployees()', err);
        const mockEmployees = ['no employees could be loaded'];
        return of(mockEmployees);
      })
    );
  }
}
