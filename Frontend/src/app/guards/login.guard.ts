import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from "../services/login.service";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router, private loginService: LoginService) {
  };

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.loginService.isLoggedIn()) {
      this.router.navigate(['/head/main']);
      return false;
    }
    return true;
  }
}
