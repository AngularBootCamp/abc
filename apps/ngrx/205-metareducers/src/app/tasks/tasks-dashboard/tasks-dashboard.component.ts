import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-tasks-dashboard-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrl: './tasks-dashboard.component.scss',
  imports: [
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ]
})
export class TasksDashboardComponent {}
