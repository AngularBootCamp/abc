import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { delay, firstValueFrom, tap } from 'rxjs';

import { ImageMetadata, RedditResponse } from '../types';

@Injectable({
  providedIn: 'root'
})
export class RedditImageSearchService {
  private http = inject(HttpClient);

  search(
    subReddit: string,
    search: string
  ): Promise<ImageMetadata[]> {
    const url = `https://www.reddit.com/r/${subReddit}/search.json`;
    const params = { restrict_sr: 'on', q: search };

    return firstValueFrom(
      this.http.get<RedditResponse>(url, { params }).pipe(
        delay(Math.random() * 5000), // Simulate flaky connection
        tap(() => console.log(`results for ${search}`))
      )
    ).then(translateRedditResults);
  }
}

function translateRedditResults(
  response: RedditResponse
): ImageMetadata[] {
  // This function doesn't know anything about HTTP or Observable; it just
  // manages the messy shape of this API's data return layout.

  return response.data.children
    .map((listing): ImageMetadata | undefined => {
      const listingData = listing?.data;
      if (listingData) {
        const thumbnail = listingData.thumbnail;
        const title = listingData.title;
        if (thumbnail.startsWith('http')) {
          return { thumbnail, title };
        }
      }
      return undefined;
    })
    .filter((metadata): metadata is ImageMetadata => !!metadata);
}
