/* eslint-disable @angular-eslint/prefer-on-push-component-change-detection
-- This older unit testing example assumes zone.js and Default CDS
*/
import { Component } from '@angular/core';

import { ScoreComponent } from './score/score.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ScoreComponent],
})
export class AppComponent {
  protected onNotify(notification: string) {
    window.alert(notification);
  }
}
