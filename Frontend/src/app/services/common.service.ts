import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Subject, throwError} from "rxjs";
import {Router} from "@angular/router";
import {LoginService} from "./login.service";
import {Place} from "../model/place";
import {environment} from "../../environments/environment";

const URL = "/api";

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  login: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router,private http: HttpClient) {
  }

  createAuthorizationHeader() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', localStorage.getItem('token'));
    return headers;
  }

  isLoggedIn() {
    return localStorage.getItem('token') != undefined;
  }

 //  async isLoggedInWithServer(){
 //    let re:boolean=false;
 //    await this.http.get<void>(environment.backend_url + URL + "/admin/chkLogin", {headers: this.createAuthorizationHeader()}).subscribe(
 //      (result)=>{
 //        console.log(123)
 //        re=true;
 //      },(error)=>{
 //        // localStorage.clear();
 //        // this.setLoginOrLogout(false);
 //        // return false;
 //        console.log(error)
 //        re=false;
 //      }
 //    )
 //    console.log(re)
 // return re;
 //    // this.http.get<void>(environment.backend_url + URL + "/admin/chkLogin", {headers: this.createAuthorizationHeader()})
 //  }

  setLoginOrLogout(logged) {
    this.login.next(logged)
  }

  errorHandler(error: HttpErrorResponse) {
    // console.log(error.error.message)
    if (error.error.message == 'JWT Token is incorrect') {
      localStorage.clear();
      this.setLoginOrLogout(false);
      this.router.navigate(['/head/main'])
    }
    return throwError(error.message || "Server Error")
  }
}
