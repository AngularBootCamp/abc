import { Component } from '@angular/core';
import {
  RouterLinkActive,
  RouterLink,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterLinkActive, RouterLink, RouterOutlet]
})
export class AppComponent {}
