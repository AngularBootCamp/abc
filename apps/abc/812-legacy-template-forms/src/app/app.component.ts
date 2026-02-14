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
  protected readonly credentials = { login: '', password: '' };

  // Event handler for form submit
  protected onLogin(): void {
    console.log('Form Submitted', this.credentials);
  }
}
