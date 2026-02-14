import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { ColorSchemeObserver } from '@class-materials/shared/util-color-scheme-observer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly colorScheme = toSignal(
    inject(ColorSchemeObserver).observe()
  );
}
