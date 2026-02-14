import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { UrlHandler } from '../types';

@Component({
  selector: 'oasis-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [MatToolbarModule, MatButtonModule]
})
export class HeaderComponent {
  readonly title = input.required<string>();
  readonly documents = input<UrlHandler[]>([]);
}
