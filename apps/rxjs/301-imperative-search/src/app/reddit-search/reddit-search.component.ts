import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { debounce } from 'lodash-es';

import { ImageMetadata } from '../types';

import { RedditImageSearchService } from './reddit-image-search.service';

@Component({
  selector: 'app-reddit-search',
  templateUrl: './reddit-search.component.html',
  styleUrl: './reddit-search.component.scss',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule
  ]
})
export class RedditSearchComponent {
  private ris = inject(RedditImageSearchService);

  subReddits = [
    'aww',
    'wholesomememes',
    'mildlyinteresting',
    'awesome'
  ];
  subReddit = this.subReddits[0];
  search = '';
  results: ImageMetadata[] = [];
  private lastSubreddit = '';
  private lastSearch = '';

  constructor() {
    // The lodash debounce function can potentially return undefined, but that isn't
    // a practical problem in this use case, so we override the type.
    this.findResults = debounce(
      this.findResults.bind(this),
      500
    ) as () => Promise<void>;
  }

  async findResults() {
    const search = this.search.trim();
    const subReddit = this.subReddit.trim();
    const noChange =
      search === this.lastSearch && subReddit === this.lastSubreddit;
    const emptySearch = !this.search || !this.subReddit;
    if (noChange || emptySearch) {
      return;
    }
    this.results = [];
    this.lastSearch = search;
    this.lastSubreddit = subReddit;
    this.results = await this.ris.search(subReddit, search);
  }
}
