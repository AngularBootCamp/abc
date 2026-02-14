import { Component } from '@angular/core';

import { BlinkDirective } from './blink.directive';
import { BounceDirective } from './bounce.directive';
import { DragDirective } from './drag.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [BlinkDirective, BounceDirective, DragDirective]
})
export class AppComponent {}
