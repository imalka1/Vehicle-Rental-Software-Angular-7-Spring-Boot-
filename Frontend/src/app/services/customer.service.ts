import { Injectable } from '@angular/core';
import {Place} from "../model/place";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./common.service";
import {Customer} from "../model/customer";

const URL = "/api/customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient, private commonService: CommonService) { }

  getCustomerViaEmail(emailAddress:string): Observable<Customer> {
    return this.http.get<Customer>(environment.backend_url + URL + "/customer_via_email/"+emailAddress);
  }
}
