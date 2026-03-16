import { Component } from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-tasks-dashboard-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss',
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class TasksDashboardComponent {}
