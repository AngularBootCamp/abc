import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { of, switchMap } from 'rxjs';

import { ColorSchemeObserver } from '@class-materials/shared/util-color-scheme-observer';

import { LoggerService } from '../logger.service';

import { ConstellationLoader } from './constellation-loader.service';

@Component({
  selector: 'app-constellation-viewer-using-inject',
  imports: [AsyncPipe, RouterLink, RouterLinkActive],
  styleUrl: '../constellation-viewer-shared-template.component.scss',
  templateUrl:
    '../constellation-viewer-shared-template.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ConstellationViewerComponent {
  public readonly id = input<string | undefined>();

  private readonly constellationLoader = inject(ConstellationLoader);
  private readonly logger = inject<LoggerService>(LoggerService, {
    optional: true
  });

  protected readonly imageZoomed = signal(false);
  protected readonly imageLoaded = signal(false);

  protected readonly colorScheme$ = inject(
    ColorSchemeObserver
  ).observe();

  protected readonly constellations$ =
    this.constellationLoader.getConstellations();

  protected readonly selectedConstellation$ = toObservable(
    this.id
  ).pipe(
    switchMap(iauAbbreviation => {
      this.imageLoaded.set(false);
      this.imageZoomed.set(false);

      if (iauAbbreviation) {
        this.logger?.log(
          `Loading constellation with IAU abbreviation "${iauAbbreviation}"`
        );

        return this.constellationLoader.getConstellation(
          iauAbbreviation
        );
      } else {
        this.logger?.log('Clearing constellation');
        return of(null);
      }
    })
  );
}
