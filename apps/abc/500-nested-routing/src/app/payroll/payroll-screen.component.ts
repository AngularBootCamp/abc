import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-payroll-screen',
  templateUrl: './payroll-screen.component.html',
  imports: [RouterLinkActive, RouterLink, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayrollScreenComponent {}
