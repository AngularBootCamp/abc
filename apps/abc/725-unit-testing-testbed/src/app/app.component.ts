/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection
-- This older unit testing example assumes zone.js and Default CDS
*/
import { Component, inject } from '@angular/core';

import { HelloService } from './hello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly hello = inject(HelloService);

  // Note: These members are only marked public for testing.

  public greeting = '';

  public calculateGreeting() {
    this.greeting = this.hello.calculateHello('Hello');
  }
}
