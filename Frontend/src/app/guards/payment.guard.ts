import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {CommonService} from "../services/common.service";
import {PaymentService} from "../services/payment.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {
  constructor(
    private router: Router,
    private paymentService: PaymentService
  ) {};

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.paymentService.getRandomNumber()===next.queryParams['success']) {
      // this.router.navigate(['/head/main']);
      return true;
    }
    return false;
  }
  
}
