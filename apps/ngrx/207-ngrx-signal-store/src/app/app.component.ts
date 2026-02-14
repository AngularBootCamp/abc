import { Component, effect, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';

import { DisplayOrEditComponent } from '@class-materials/shared/ui-display-or-edit';
import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { ConfigStore } from './config.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    DisplayOrEditComponent,
    HeaderComponent,
    MatButtonModule,
    MatToolbarModule,
    RouterLink,
    RouterOutlet
  ]
})
export class AppComponent {
  private readonly configStore = inject(ConfigStore);
  title = new FormControl('', { nonNullable: true });

  constructor() {
    effect(() => {
      this.title.setValue(this.configStore.title());
    });
  }

  setTitle() {
    this.configStore.updateTitle(this.title.value);
  }
}
