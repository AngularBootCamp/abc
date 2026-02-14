import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    HeaderComponent,
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
    RouterOutlet
  ]
})
export class AppComponent {}
