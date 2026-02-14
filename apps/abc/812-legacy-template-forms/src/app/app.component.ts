import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [FormsModule, JsonPipe]
})
export class AppComponent {
  credentials = { login: '', password: '' };

  // Event handler for form submit
  onLogin(): void {
    console.log('Form Submitted', this.credentials);
  }
}
