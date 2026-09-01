import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'vst-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterLink, RouterOutlet, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
