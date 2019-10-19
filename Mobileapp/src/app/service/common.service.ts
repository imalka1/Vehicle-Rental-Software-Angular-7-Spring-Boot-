import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Subject, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    login: Subject<boolean> = new Subject<boolean>();

    constructor(private router: Router) {
    }

    createAuthorizationHeader() {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', localStorage.getItem('token'));
        return headers;
    }

    isLoggedIn() {
        return localStorage.getItem('token') != undefined;
    }

    setLoginOrLogout(logged) {
        this.login.next(logged)
    }

    errorHandler(error: HttpErrorResponse) {
        // console.log(error.error.message)
        if (error.error.message == 'JWT Token is incorrect') {
            localStorage.clear();
            this.setLoginOrLogout(false);
            this.router.navigate(['/auth'])
        }
        return throwError(error.message || "Server Error")
    }
}
