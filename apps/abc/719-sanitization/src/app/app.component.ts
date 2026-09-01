import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly stringWithHtml = signal(`
    <button type="button" onClick="window.alert('Hello from JavaScript');">
      Press Me
    </button>
    <em>Hello from <strong>HTML</strong></em>
  `);

  // TODO: Make sure the HTML is actually safe. :)
  protected readonly htmlProperty = computed(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.stringWithHtml()),
  );
}
