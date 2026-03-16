/* eslint-disable @angular-eslint/prefer-standalone */
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
