import { Component } from '@angular/core';

import {
  InfoWrapperComponent,
  InfoWrapperChildrenComponent
} from './info-wrapper.component';
import { WarningWrapperComponent } from './warning-wrapper.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    WarningWrapperComponent,
    InfoWrapperComponent,
    InfoWrapperChildrenComponent
  ]
})
export class AppComponent {}
