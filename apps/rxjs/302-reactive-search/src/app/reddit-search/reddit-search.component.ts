import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  retry,
  startWith,
  switchMap
} from 'rxjs';

import { ImageMetadata } from '../types';

import { RedditImageSearchService } from './reddit-image-search.service';

@Component({
  selector: 'app-reddit-search',
  templateUrl: './reddit-search.component.html',
  styleUrl: './reddit-search.component.scss',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatInputModule,
    AsyncPipe
  ]
})
export class RedditSearchComponent {
  subReddits = [
    'aww',
    'wholesomememes',
    'mildlyinteresting',
    'awesome'
  ];
  subReddit = new FormControl(this.subReddits[0], {
    nonNullable: true
  });
  search = new FormControl('', { nonNullable: true });
  results: Observable<ImageMetadata[]>;

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

    const combinedCriteria = combineLatest([
      validSubReddit,
      validSearch
    ]).pipe(map(([subReddit, search]) => ({ subReddit, search })));

    this.results = combinedCriteria.pipe(
      switchMap(val =>
        ris.search(val.subReddit, val.search).pipe(
          retry(3),
          // Clear previous entries while waiting
          startWith([])
        )
      )
    );
  }
}
