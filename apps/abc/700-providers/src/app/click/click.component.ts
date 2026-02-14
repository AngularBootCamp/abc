import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ColorSchemeObserver } from '@class-materials/shared/util-color-scheme-observer';

import { ClickService } from '../click.service';

@Component({
  selector: 'app-local-click',
  template: `
    <button>
      <img
        src="assets/abc-logo-{{ colorScheme() }}-mode.svg"
        (click)="increment()"
        alt="Angular Boot Camp"
      />
    </button>
    <h4># of Clicks: {{ totalClicks | async }}</h4>
  `,
  styleUrl: './click.component.scss',
  imports: [AsyncPipe]
})
export class ClickComponent {
  readonly colorScheme = toSignal(
    inject(ColorSchemeObserver).observe()
  );

  private readonly service = inject(ClickService);

  readonly totalClicks = this.service.clickCount;

  increment() {
    this.service.increment().catch(err => console.log(err));
  }
}
