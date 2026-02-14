import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.routes')
  }
];
