import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-name',
  template: `
    <header>Hello {{ name() || 'Random Citizen' }}!</header>
    <p>I am a sample component.</p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameComponent {
  public readonly name = input<string>();
}
