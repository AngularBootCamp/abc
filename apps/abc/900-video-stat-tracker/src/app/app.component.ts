import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'vst-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterLink, RouterOutlet]
})
export class AppComponent {}
