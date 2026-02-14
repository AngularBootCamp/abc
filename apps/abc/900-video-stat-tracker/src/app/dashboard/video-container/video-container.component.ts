import { Component, computed, input, inject } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Video } from '../dashboard.types';

const URLPREFIX = 'https://www.youtube-nocookie.com/embed/';

@Component({
  selector: 'vst-video-container',
  templateUrl: './video-container.component.html',
  styleUrl: './video-container.component.scss'
})
export class VideoContainerComponent {
  private domSanitizer = inject(DomSanitizer);

  readonly currentVideo = input.required<Video | undefined>();

  readonly videoUrl = computed<SafeUrl | undefined>(() => {
    // iframe src attributes are a potential source of attack. Tell
    // Angular we have vetted the URL as safe to use.
    //
    // IMPORTANT: You would normally check the URL before passing it on!
    const value = this.currentVideo();
    return value
      ? this.domSanitizer.bypassSecurityTrustResourceUrl(
          URLPREFIX + '/' + value.id
        )
      : undefined;
  });
}
