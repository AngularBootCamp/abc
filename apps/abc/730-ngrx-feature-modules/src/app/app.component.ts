import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { Store } from '@ngrx/store';

import { selectUserName } from './user-profile/user-profile.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterLinkActive, RouterLink, RouterOutlet, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected readonly userName = inject(Store).select(selectUserName);
}
