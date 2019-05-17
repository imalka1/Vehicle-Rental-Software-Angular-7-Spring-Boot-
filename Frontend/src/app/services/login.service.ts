import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  setLoginOrLogout(logged) {
    this.login.next(logged)
  }

  isLoggedIn() {
    return localStorage.getItem('login') != undefined ? localStorage.getItem('login') == 'true' ? true : false : false;
  }
}
