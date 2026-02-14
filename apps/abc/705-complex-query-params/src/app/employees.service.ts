import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, shareReplay, switchMap } from 'rxjs';

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  hoursWorked: number;
  hourlyWage: number;
}

export interface TableOptions {
  sortBy: string;
  sortDirection: 'asc' | 'desc';
  filter: string;
}

// Convert any possible value to 'desc' or 'asc'
function convertToAscOrDesc(dir: unknown) {
  return dir === 'desc' ? 'desc' : 'asc';
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Observable<Employee[]>;
  tableOptions: Observable<TableOptions>;

  constructor() {
    const route = inject(ActivatedRoute);
    const http = inject(HttpClient);

    this.tableOptions = route.queryParamMap.pipe(
      map(params => ({
        sortBy: params.get('sortBy') || '',
        sortDirection: convertToAscOrDesc(
          params.get('sortDirection')
        ),
        filter: params.get('filter') || ''
      }))
    );

    this.employees = this.tableOptions.pipe(
      switchMap(options => {
        const params: { _sort: string; _order: string; q?: string } =
          {
            _sort: options.sortBy,
            _order: options.sortDirection
          };

        if (options.filter) {
          params['q'] = options.filter;
        }

        return http.get<Employee[]>(apiUrl + '/employees', {
          params
        });
      }),
      shareReplay(1)
    );
  }
}
