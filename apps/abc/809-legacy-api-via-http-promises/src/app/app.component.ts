import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';

import { JsonPipe } from '@angular/common';

import { FilmMeta, StarshipApiService } from './starship-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  protected starships: FilmMeta[] = [];

  private cdr = inject(ChangeDetectorRef);

  constructor() {
    inject(StarshipApiService)
      .loadStarships()
      .then(ships => (this.starships = ships))
      .catch(_err => (this.starships = []))
      .finally(() => this.cdr.markForCheck());
  }
}
