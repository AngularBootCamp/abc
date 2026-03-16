/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection
-- This older unit testing example assumes zone.js and Default CDS
*/
/* eslint-disable @angular-eslint/prefer-inject
-- This older unit testing example requires constructor-based DI
*/
import { Component } from '@angular/core';

import { HelloService } from './hello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Note: This is only marked public for testing.
  public greeting: string;

  constructor(hello: HelloService) {
    this.greeting = hello.calculateHello('Hello');
  }
}
