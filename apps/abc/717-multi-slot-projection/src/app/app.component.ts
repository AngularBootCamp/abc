import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  InfoWrapperChildrenComponent,
  InfoWrapperComponent,
} from './info-wrapper.component';
import { WarningWrapperComponent } from './warning-wrapper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    WarningWrapperComponent,
    InfoWrapperComponent,
    InfoWrapperChildrenComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
