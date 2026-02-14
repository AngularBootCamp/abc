import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';

// Local API server
// const apiUrl = '/api';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  employees = signal<Employee[]>([]);
  loading = signal(true);

  constructor() {
    const http = inject(HttpClient);

    http
      .get<Employee[]>(apiUrl + '/employees')
      .subscribe(employees => {
        this.loading.set(false);
        this.employees.set(employees);
      });
  }
}
