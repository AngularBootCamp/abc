import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected name = 'John';
}
