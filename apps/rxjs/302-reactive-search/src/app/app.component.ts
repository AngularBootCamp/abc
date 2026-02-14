import { Component } from '@angular/core';

import { HeaderComponent } from '@class-materials/shared/ui-page-header';

import { RedditSearchComponent } from './reddit-search/reddit-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [HeaderComponent, RedditSearchComponent]
})
export class AppComponent {}
