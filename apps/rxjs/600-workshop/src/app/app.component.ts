import { Component } from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    HeaderComponent,
    MatListModule,
    MatSidenavModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
})
export class AppComponent {}
