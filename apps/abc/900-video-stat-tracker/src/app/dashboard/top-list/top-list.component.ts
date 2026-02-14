import { Component, output, input } from '@angular/core';

import { Video } from '../dashboard.types';

// This component serves as a small example of
// a view component. In this case, the dashboard
// is acting as the corresponding smart component
@Component({
  selector: 'vst-top-list',
  templateUrl: './top-list.component.html',
  styleUrl: './top-list.component.scss'
})
export class TopListComponent {
  readonly topList = input.required<Video[]>();
  readonly selectedVideo = input.required<Video | undefined>();
  readonly videoChanged = output<Video>();

  selectVideo(video: Video) {
    this.videoChanged.emit(video);
  }
}
