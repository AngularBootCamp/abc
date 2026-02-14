import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';

import { Employee } from './employee';

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

// Configure the amount of latency and jitter to simulate
const apiLatency = 100;

// Set to 3000 to see that out-of-order replies don't cause any problem:
const apiJitter = 100;

@Injectable({
  providedIn: 'root'
})
export class EmployeeLoaderService {
  private http = inject(HttpClient);

  getList(searchText: string): Observable<Employee[]> {
    const params = { q: searchText, _limit: '20' };

    return this.http
      .get<Employee[]>(apiUrl + '/employees', {
        params
      })
      .pipe(delay(randomDelay()));
  }

  getDetails(employeeId: number): Observable<Employee> {
    return this.http
      .get<Employee>(`${apiUrl}/employees/${employeeId}`)
      .pipe(delay(randomDelay()));
  }
}

function randomDelay() {
  return Math.round(apiLatency + Math.random() * apiJitter);
}
