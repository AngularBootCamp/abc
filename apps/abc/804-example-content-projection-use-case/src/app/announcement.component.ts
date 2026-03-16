import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-announcement-card',
  templateUrl: './announcement.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementComponent {}

@Component({
  selector:
    'app-announcement-title, app-announcement-image, app-announcement-description',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementComponentChildrenComponent {}
