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
  private ds = inject(DashboardService);

  videoList = this.ds.videoList;
  selectedVideo = this.ds.currentVideo;

  videoChanged(video: Video) {
    this.ds.updateVideo(video);
  }
}
