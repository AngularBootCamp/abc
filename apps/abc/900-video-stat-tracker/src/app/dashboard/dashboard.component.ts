import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { DashboardService } from './dashboard.service';
import { Video } from './dashboard.types';
import { TopListComponent } from './top-list/top-list.component';
import { VideoContainerComponent } from './video-container/video-container.component';
import { ViewsBreakdownComponent } from './views-breakdown/views-breakdown.component';
import { ViewsFilterComponent } from './views-filter/views-filter.component';

@Component({
  selector: 'vst-app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  imports: [
    TopListComponent,
    VideoContainerComponent,
    ViewsBreakdownComponent,
    ViewsFilterComponent,
    AsyncPipe
  ]
})
export default class DashboardComponent {
  private readonly ds = inject(DashboardService);

  protected readonly videoList = this.ds.videoList;
  protected readonly selectedVideo = this.ds.currentVideo;

  protected videoChanged(video: Video) {
    this.ds.updateVideo(video);
  }
}
