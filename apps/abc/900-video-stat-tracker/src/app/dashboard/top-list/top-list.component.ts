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
  public readonly topList = input.required<Video[]>();
  public readonly selectedVideo = input.required<Video | undefined>();
  public readonly videoChanged = output<Video>();

  protected selectVideo(video: Video) {
    this.videoChanged.emit(video);
  }
}
