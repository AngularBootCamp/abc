import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { authorIdRouteParam } from '../routing-parameters';

import { AuthorComponent } from './author/author.component';
import { AuthorEffects } from './author/author.effects';
import * as fromAuthor from './author/author.reducer';
import { AuthorListComponent } from './author-list/author-list.component';

const blogRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(fromAuthor.authorFeature),
      provideEffects(AuthorEffects)
    ],
    children: [
      {
        path: '',
        component: AuthorListComponent
      },
      {
        path: `:${authorIdRouteParam}`,
        component: AuthorComponent
      }
    ]
  }
];

export default blogRoutes;
