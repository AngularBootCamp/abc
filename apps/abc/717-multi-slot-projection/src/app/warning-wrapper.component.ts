import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-warning-wrapper',
  styles: 'article { border: 3px solid var(--abc-warning-color); }',
  template: `
    <article>
      <ng-content select="[header]" />
      <ng-content select="[body]" />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WarningWrapperComponent {}
