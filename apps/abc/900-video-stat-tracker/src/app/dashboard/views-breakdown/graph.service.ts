import { Injectable, inject } from '@angular/core';
import { combineLatest, filter, map, startWith } from 'rxjs';

import { DashboardService } from '../dashboard.service';
import { FilterOptions, Video } from '../dashboard.types';

import { getGraphData } from './graph-helper';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private readonly ds = inject(DashboardService);
  public readonly graphData = combineLatest([
    this.ds.currentVideo,
    this.ds.filterForm.valueChanges.pipe(
      startWith(this.ds.filterForm.value as FilterOptions)
    )
  ]).pipe(
    filter(([video]) => !!video),
    map(([video, formValue]) =>
      getGraphData(video as Video, formValue as FilterOptions)
    )
  );
}
