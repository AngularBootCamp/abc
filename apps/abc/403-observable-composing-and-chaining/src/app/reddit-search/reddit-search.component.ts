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
  switchMap
} from 'rxjs';

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
      startWith(this.subReddit.value)
    );

    const validSearch = this.search.valueChanges.pipe(
      startWith(this.search.value),
      map(search => search.trim()),
      debounceTime(350),
      distinctUntilChanged(),
      filter(search => search !== '')
    );

    this.results = combineLatest([validSubReddit, validSearch]).pipe(
      switchMap(([subReddit, search]) =>
        ris.search(subReddit, search).pipe(
          retry(3),
          // Clear previous entries while waiting
          startWith([])
        )
      )
    );
  }
}
