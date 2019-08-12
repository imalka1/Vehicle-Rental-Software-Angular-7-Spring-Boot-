import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {User} from "../model/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Place} from "../model/place";
import {environment} from "../../environments/environment";
import {Token} from "../dtos/token";
import {CommonService} from "./common.service";
import {catchError} from "rxjs/operators";

const URL = "/api";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  accLogin(user: User): Observable<Token> {
    return this.http.post<Token>(environment.backend_url + URL + "/login", user);
  }

  accLogout(): Observable<void> {
    return this.http.get<void>(environment.backend_url + URL + "/logout", {headers: this.commonService.createAuthorizationHeader()});
  }
}
