import { AsyncPipe } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable, of } from 'rxjs';

import { ColorSchemeObserver } from '@class-materials/shared/util-color-scheme-observer';

import { LoggerService } from '../logger.service';
import { Constellation } from '../types';

import { ConstellationLoader } from './constellation-loader.service';

function observeColorscheme() {
  return inject(ColorSchemeObserver).observe();
}

@Component({
  selector: 'app-constellation-viewer-using-inject',
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  styleUrl: '../constellation-viewer-shared-template.component.scss',
  templateUrl:
    '../constellation-viewer-shared-template.component.html'
})
export default class ConstellationViewerComponent {
  readonly id = input<string | undefined>();

  private readonly logger = inject<LoggerService>(LoggerService, {
    optional: true
  });

  private readonly constellationLoader = inject(ConstellationLoader);

  readonly constellations$ =
    this.constellationLoader.getConstellations();

  readonly colorScheme$ = observeColorscheme();

  selectedConstellation$: Observable<Constellation | null> = of(null);
  imageZoomed = false;
  imageLoaded = false;

  constructor() {
    // When the constellation ID changes, load the corresponding
    // constellation.
    effect(() => {
      const iauAbbreviation = this.id();
      if (iauAbbreviation) {
        this.selectConstellation(iauAbbreviation);
      }
    });
  }

  selectConstellation(iauAbbreviation: string) {
    this.logger?.log(
      `Loading constellation with IAU abbreviation "${iauAbbreviation}"`
    );

    this.imageLoaded = false;
    this.imageZoomed = false;

    this.selectedConstellation$ = iauAbbreviation
      ? this.constellationLoader.getConstellation(iauAbbreviation)
      : of(null);
  }
}
