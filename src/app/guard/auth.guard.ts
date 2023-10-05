import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    console.log('Route : ', route);

    if (this.loginService.getIsLoggedIn()) {
      const userRole = this.loginService.getRole();
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(['/book']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/book']);
    return false;
  }
}
