import {
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault
} from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault]
})
export class AppComponent {
  n = 0;
  food = 'apple';

  increment() {
    this.n++;
  }

  results() {
    if (this.n > 1 && this.n < 5) {
      return this.n;
    }
    return undefined;
  }
}
