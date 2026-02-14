import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { StarshipApiService } from './starship-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [AsyncPipe]
})
export class AppComponent {
  starships = inject(StarshipApiService).starships();
}
