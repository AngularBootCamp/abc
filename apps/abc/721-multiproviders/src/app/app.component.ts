import { Component } from '@angular/core';

import { RedditSearchComponent } from './reddit-search/reddit-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RedditSearchComponent]
})
export class AppComponent {}
