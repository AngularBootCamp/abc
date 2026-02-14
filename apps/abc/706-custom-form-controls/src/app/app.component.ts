import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { UsStatesSelectorComponent } from './us-states-selector/us-states-selector.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ReactiveFormsModule, UsStatesSelectorComponent, JsonPipe]
})
export class AppComponent {
  usStateSelector = new FormControl<string | null>(null);
}
