import { MediaMatcher } from '@angular/cdk/layout';
import { Injectable, inject, DOCUMENT } from '@angular/core';
import {
  Observable,
  Observer,
  combineLatestWith,
  fromEvent,
  map,
  startWith,
  shareReplay
} from 'rxjs';

type ColorScheme = 'light' | 'dark';

// Use the system color scheme and the custom color scheme (if there is
// one) to return the "effective" color scheme -- that is, just 'light'
// or 'dark'.
function effectiveColorScheme([
  systemColorScheme,
  customColorScheme
]: [ColorScheme, string | null]): ColorScheme {
  // Note that any non-null customColorScheme value other than 'dark'
  // implies 'light', which matches the behavior of Pico CSS. (I don't
  // love this behavior, TBH, but it's probably the right thing to do.
  // Maybe.)

  switch (customColorScheme) {
    // XXX: Should this also check for undefined and/or empty string,
    // especially once we're checking for more than just attribute
    // values?
    case null:
      return systemColorScheme;
    case 'dark':
      return 'dark';
    default:
      return 'light';
  }
}

@Injectable({
  providedIn: 'root'
})
export class ColorSchemeObserver {
  private readonly DOCUMENT = inject(DOCUMENT);
  private readonly defaultObservedElement =
    this.DOCUMENT.documentElement;
  private readonly defaultObservedAttribute = 'data-theme';
  private readonly systemColorSchemeQuery = inject(
    MediaMatcher
  ).matchMedia('(prefers-color-scheme: dark)');

  private readonly systemColorScheme$ = fromEvent<MediaQueryList>(
    this.systemColorSchemeQuery,
    'change'
  ).pipe(
    startWith(this.systemColorSchemeQuery),
    map(e => (e.matches ? 'dark' : 'light'))
  );

  private observeCustomColorScheme(
    observedElement: HTMLElement,
    observedAttribute: string
  ) {
    return new Observable<string | null>(
      (observer: Observer<string | null>) => {
        const mutationObserver = new MutationObserver(
          mutationList => {
            // Notify the observer for every change to the custom color scheme.
            mutationList.forEach(() => {
              observer.next(
                observedElement.getAttribute(observedAttribute)
              );
            });
          }
        );

        mutationObserver.observe(observedElement, {
          attributeFilter: [observedAttribute],
          subtree: false
        });

        return () => {
          // Discard any remaining mutation records, then stop watching
          // for mutations.
          mutationObserver.takeRecords();
          mutationObserver.disconnect();
        };
      }
    ).pipe(
      startWith(observedElement.getAttribute(observedAttribute))
    );
  }

  observe(
    observedElement = this.defaultObservedElement,
    observedAttribute = this.defaultObservedAttribute
  ): Observable<ColorScheme> {
    return this.systemColorScheme$.pipe(
      combineLatestWith(
        this.observeCustomColorScheme(
          observedElement,
          observedAttribute
        )
      ),
      map(effectiveColorScheme),
      shareReplay({ bufferSize: 1, refCount: true })
    );
  }
}
