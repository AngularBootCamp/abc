import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>
      This step is Creating Your New Project; there is no code to
      explore here. See the instructor's presentation to learn how to
      set up your own project.
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
