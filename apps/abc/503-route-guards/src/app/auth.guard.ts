import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from './auth.service';

export function AuthGuard(
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('Checking user access to route...', route);

  if (authService.currentUserHasAccessTo(route)) {
    return true;
  } else {
    console.log(
      'User does not have access to route -- redirecting...'
    );
    // Returning a route to redirect to
    return router.parseUrl('forbidden');
  }
}
