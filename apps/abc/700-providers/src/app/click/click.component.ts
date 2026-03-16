import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { AsyncPipe } from '@angular/common';

import { ColorSchemeObserver } from '@class-materials/shared/util-color-scheme-observer';

import { ClickService } from '../click.service';

@Component({
  selector: 'app-local-click',
  template: `
    @let imgSrc = 'assets/abc-logo-' + colorScheme() + '-mode.svg';
    <button>
      <img [src]="imgSrc" (click)="increment()" alt="Angular Boot Camp" />
    </button>
    <h4># of Clicks: {{ totalClicks | async }}</h4>
  `,
  styleUrl: './click.component.scss',
  imports: [AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClickComponent {
  private readonly service = inject(ClickService);

  protected readonly colorScheme = toSignal(
    inject(ColorSchemeObserver).observe(),
  );

  protected readonly totalClicks = this.service.clickCount;

  protected increment() {
    this.service.increment().catch(err => console.log(err));
  }
}
