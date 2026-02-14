import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Observable,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  retry,
  startWith,
  switchMap,
  tap
} from 'rxjs';

import { LogService } from '../loggers/log.service';

import { RedditImageSearchService } from './reddit-image-search.service';
import { ImageMetadata } from './types';

@Component({
  selector: 'app-reddit-search',
  templateUrl: './reddit-search.component.html',
  styleUrl: './reddit-search.component.scss',
  imports: [ReactiveFormsModule, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedditSearchComponent {
  private readonly logger = inject(LogService);

  protected readonly subReddits = signal([
    'aww',
    'wholesomememes',
    'mildlyinteresting',
    'awesome'
  ]);

  protected readonly subReddit = new FormControl(
    this.subReddits()[0],
    {
      nonNullable: true
    }
  );

  protected readonly search = new FormControl('', {
    nonNullable: true
  });

  protected readonly results: Observable<ImageMetadata[]>;

  constructor() {
    const ris = inject(RedditImageSearchService);

    const validSubReddit = this.subReddit.valueChanges.pipe(
      startWith<string>(this.subReddit.value)
    );

    const validSearch = this.search.valueChanges.pipe(
      startWith<string>(this.search.value),
      map(search => search.trim()),
      debounceTime(200),
      distinctUntilChanged(),
      filter(search => search !== '')
    );

    this.results = combineLatest([validSubReddit, validSearch]).pipe(
      // This logs the user's intended search
      tap(search => this.logger.log('Search for: ' + search)),
      switchMap(([subReddit, search]) =>
        ris.search(subReddit, search).pipe(
          // The following would log the actual request
          // tap(search => this.logger.log('Search for: ' + search)),
          retry(3),
          // Clear previous entries while waiting
          startWith([])
        )
      )
    );
  }
}
