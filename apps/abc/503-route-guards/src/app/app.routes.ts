import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { authGuard } from './auth.guard';
import { BigFormComponent } from './big-form.component';
import { ForbiddenComponent } from './forbidden.component';
import { formDeactivateGuard } from './form-deactivate.guard';
import { HomeComponent } from './home.component';
import { NameComponent } from './name.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hello', component: NameComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard],
  },
  {
    path: 'bigform',
    component: BigFormComponent,
    canDeactivate: [formDeactivateGuard],
  },
];
