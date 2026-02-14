import { Component } from '@angular/core';

import { ScoreComponent } from './score/score.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [ScoreComponent]
})
export class AppComponent {
  onNotify(notification: string) {
    window.alert(notification);
  }
}
