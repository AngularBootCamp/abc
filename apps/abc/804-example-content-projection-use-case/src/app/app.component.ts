import { Component, signal } from '@angular/core';

import {
  AnnouncementComponent,
  AnnouncementComponentChildrenComponent
} from './announcement.component';
import {
  CollectionPanelComponent,
  CollectionPanelChildrenComponent
} from './collection-panel.component';

export interface Announcement {
  title: string;
  image: string;
  description: string;
}

function sampleAnnouncements() {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sodales velit leo, id vestibulum risus maximus eget.',
    'Ut arcu eros, blandit ac sem vel, tincidunt efficitur risus. Curabitur tempor sapien massa, in bibendum mauris.',
    'Duis congue velit a nibh auctor hendrerit. In sollicitudin pulvinar magna ut vulputate. Duis semper, est maximus.'
  ];

  const arr: Announcement[] = [];

  for (let x = 0; x < 6; x++) {
    arr.push({
      title: `Announcement ${x + 1}`,
      image: `./assets/image${(x % 2) + 1}.jpg`,
      description: descriptions[x % 3]
    });
  }

  return arr;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CollectionPanelComponent,
    CollectionPanelChildrenComponent,
    AnnouncementComponent,
    AnnouncementComponentChildrenComponent
  ]
})
export class AppComponent {
  announcements = signal<Announcement[]>(sampleAnnouncements());
}
