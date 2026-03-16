import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { UrlHandler } from '../types';

@Component({
  selector: 'oasis-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [MatToolbarModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  public readonly title = input.required<string>();
  public readonly documents = input<UrlHandler[]>([]);
}
