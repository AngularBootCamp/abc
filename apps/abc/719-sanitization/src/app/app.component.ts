import { Component, inject, signal, computed } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private readonly sanitizer = inject(DomSanitizer);

  stringWithHtml = signal(`
    <button onClick="window.alert('hello from old-school HTML/JS');">
      Press Me
    </button>
    <em>Hello from <strong>HTML</strong></em>
  `);

  // TODO: Make sure the HTML is actually safe. :)
  htmlProperty = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.stringWithHtml())
  );
}
