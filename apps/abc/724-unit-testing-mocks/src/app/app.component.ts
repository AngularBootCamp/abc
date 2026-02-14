/* eslint-disable @angular-eslint/prefer-inject */

import { Component } from '@angular/core';

import { HelloService } from './hello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  greeting: string;

  constructor(hello: HelloService) {
    this.greeting = hello.calculateHello('Hello');
  }
}
