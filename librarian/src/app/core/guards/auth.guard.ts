import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private router: Router) { }

  canActivate() {
    const isLoggedIn = !!localStorage.getItem('loggedIn');
    return isLoggedIn ? true : this.router.navigate(['/login']);
  }
}

export const canActivateAuth: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionsService).canActivate();
}
