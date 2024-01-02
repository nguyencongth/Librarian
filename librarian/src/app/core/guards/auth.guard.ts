
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  constructor(private authService: AuthService, private router: Router) { }
  canActivate() {
    return this.authService.isLoggedIn() ? true : this.router.navigate(['/login']);
  }
}

export const canActivateAuth: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(PermissionsService).canActivate();
}
