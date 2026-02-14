import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  protected readonly n = signal(0);
  protected readonly food = signal('apple');

  protected increment() {
    this.n.update(n => n + 1);
  }

  protected results() {
    if (this.n() > 1 && this.n() < 5) {
      return this.n();
    }
    return undefined;
  }
}
