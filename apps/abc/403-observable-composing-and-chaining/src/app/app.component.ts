import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RedditSearchComponent } from './reddit-search/reddit-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RedditSearchComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
