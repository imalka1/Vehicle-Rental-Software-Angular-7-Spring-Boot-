import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {CommonService} from "./common.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

    constructor(
        private router: Router,
        private commonService: CommonService
    ) {
    };

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.commonService.isLoggedIn()) {
            this.router.navigate(['/auth']);
            return false;
        }
        return true;
    }
}
