import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  n = signal(0);
  food = signal('apple');

  increment() {
    this.n.update(n => n + 1);
  }

  results() {
    if (this.n() > 1 && this.n() < 5) {
      return this.n();
    }
    return undefined;
  }
}
