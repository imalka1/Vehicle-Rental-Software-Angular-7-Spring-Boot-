import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {User} from "../model/user";
import {Token} from "../dtos/token";
import {CommonService} from "./common.service";

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
