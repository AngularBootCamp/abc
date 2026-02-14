import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, interval, map, of, switchMap, tap } from 'rxjs';

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

export interface Employee {
  id: number;
  firstName: string;
  lastName?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private http = inject(HttpClient);

  getEmployees(url = '/employees') {
    return this.http.get<Employee[]>(apiUrl + url).pipe(
      catchError(err => {
        console.error('handling error within getEmployees()', err);
        const fakeData: Employee[] = [
          { id: -1, firstName: 'no employees could be loaded' }
        ];
        return of(fakeData);
      })
    );
  }

  poll1() {
    return interval(2000).pipe(
      map(n => (n % 2 ? '/employeesZZZ' : '/employees')),
      switchMap((dataUrl: string) =>
        this.http.get<Employee[]>(apiUrl + dataUrl)
      ),

      catchError(err => {
        console.error('handling error within poll1()', err);
        const fakeData: Employee[] = [
          { id: -1, firstName: 'no employees could be loaded' }
        ];
        return of(fakeData);
      }),
      tap(data => console.log('Data arrived', data))
    );
  }

  poll2() {
    return interval(2000).pipe(
      map((n: number) => (n % 2 ? '/employeesZZZ' : '/employees')),
      switchMap(dataUrl => this.getEmployees(dataUrl)),
      tap(data => console.log('Data arrived', data))
    );
  }
}
