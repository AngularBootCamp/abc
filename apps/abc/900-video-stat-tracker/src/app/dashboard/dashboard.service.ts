import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  combineLatest,
  map,
  Observable,
  shareReplay,
  tap,
  withLatestFrom
} from 'rxjs';

import { Video } from './dashboard.types';

// Local API server
// const apiUrl = 'https://api.angularbootcamp.com';

// Hosted API server
const apiUrl = 'https://api.angularbootcamp.com';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private router = inject(Router);

  filterForm: FormGroup<{
    region: FormControl<string>;
    dateTo: FormControl<string>;
    dateFrom: FormControl<string>;
    minor: FormControl<boolean>;
    adults: FormControl<boolean>;
    middleAged: FormControl<boolean>;
    retired: FormControl<boolean>;
  }>;
  currentVideo: Observable<Video | undefined>;
  videoList: Observable<Video[]>;

  private selectedVideoId: Observable<string | undefined>;

  constructor() {
    const formBuilder = inject(NonNullableFormBuilder);
    const activeRoute = inject(ActivatedRoute);

    this.selectedVideoId = activeRoute.queryParamMap.pipe(
      // query params are optional, so make sure we explicitly handle
      // that fact
      map(paramMap => paramMap.get('videoId') || undefined)
    );

    this.videoList = this.http.get<Video[]>(apiUrl + '/videos').pipe(
      // Consider the selected video once the list arrives
      // If we don't have one yet, we need to set the first video
      // as the selected video.
      // withLatestFrom will only trigger as the list changes
      withLatestFrom(this.selectedVideoId, (list, id) => ({
        list,
        id
      })),
      // use a tap to make it explicit that we are triggering
      // a side effect
      tap(({ list, id }) => {
        if (!id) {
          // no selected video id, so initialize it with the first
          // video in the list
          const navigationExtras = {
            queryParams: { videoId: list[0].id }
          };
          // "[]" means don't actually navigate, we are just looking
          // to update the query parameters
          void this.router.navigate([], navigationExtras);
        }
      }),
      // We are done with tasks involving the selected id
      // so pair back to just the list
      map(({ list }) => list),
      // If any future subscribers arrive, make sure
      // that we are giving them the previous results
      // rather than repeating the process described above
      shareReplay(1)
    );

    // Create the form in the service that way any concerned party
    // can see and react to how the user is changing the filter values
    this.filterForm = formBuilder.group({
      region: ['All'],
      dateTo: [format(startOfDay(new Date()), 'yyyy-MM-dd')],
      dateFrom: [format(new Date(1995, 0, 1), 'yyyy-MM-dd')],
      minor: [true],
      adults: [true],
      middleAged: [true],
      retired: [true]
    });

    // If the video list or selected video id change
    // lookup the video in the list and return it
    this.currentVideo = combineLatest([
      this.selectedVideoId,
      this.videoList
    ]).pipe(map(([id, list]) => list.find(video => video.id === id)));
  }

  updateVideo(video: Video) {
    void this.router.navigate([], {
      queryParams: { videoId: video.id }
    });
  }
}

function format(date: Date | number, format: string): string {
  return formatDate(date, format, 'en-US');
}

function startOfDay(date: Date): Date {
  date.setHours(0, 0, 0, 0);
  return date;
}
