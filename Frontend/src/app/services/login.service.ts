import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {User} from "../model/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Place} from "../model/place";
import {environment} from "../../environments/environment";
import {Token} from "../model/token";

const URL = "/api";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  login: Subject<boolean> = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  createAuthorizationHeader() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', localStorage.getItem('token'));
    return headers;
  }

  accLogin(user: User): Observable<Token> {
    return this.http.post<Token>(environment.backend_url + URL + "/login", user);
  }

  accLogout(): Observable<void> {
    return this.http.get<void>(environment.backend_url + URL + "/logout", {headers: this.createAuthorizationHeader()});
  }

  setLoginOrLogout(logged) {
    this.login.next(logged)
  }

  isLoggedIn() {
    return localStorage.getItem('token') != undefined;
  }
}
