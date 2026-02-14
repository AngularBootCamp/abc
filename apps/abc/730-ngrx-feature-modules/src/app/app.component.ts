import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  RouterLinkActive,
  RouterLink,
  RouterOutlet
} from '@angular/router';
import { Store } from '@ngrx/store';

import { selectUserName } from './user-profile/user-profile.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterLinkActive, RouterLink, RouterOutlet, AsyncPipe]
})
export class AppComponent {
  userName = inject(Store).select(selectUserName);
}
