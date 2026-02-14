import { Component } from '@angular/core';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  styleUrl: 'app.component.scss',
  templateUrl: 'app.component.html'
})
export class AppComponent {}
