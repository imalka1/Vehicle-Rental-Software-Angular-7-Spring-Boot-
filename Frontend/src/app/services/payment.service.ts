import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./common.service";
import {Place} from "../model/place";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ResponseDto} from "../dtos/response-dto";
import {CardDto} from "../dtos/card-dto";
import {SkuDto} from "../dtos/sku-dto";

const URL = "/api/checkout";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, private commonService: CommonService) {

  }

  makePayment(card: CardDto): Observable<SkuDto> {
    return this.http.post<SkuDto>(environment.backend_url + URL + "/create_charge", card);
  }
}
