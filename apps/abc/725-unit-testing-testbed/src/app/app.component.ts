import { Component, inject } from '@angular/core';

import { HelloService } from './hello.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private hello = inject(HelloService);

  greeting = '';

  calculateGreeting() {
    this.greeting = this.hello.calculateHello('Hello');
  }
}
