import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./common.service";
import {Place} from "../model/place";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
// import {ResponseDto} from "../dtos/response-dto";
import {CreditcardDto} from "../dtos/creditcard-dto";
import {PaymentDto} from "../dtos/payment-dto";
import {Token} from "../model/token";

const URL = "/api/checkout";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // randomNumber: number = 123;

  constructor(private http: HttpClient, private commonService: CommonService) {

  }

  // setRandomNumber(randomNumber) {
  //   Token.randomNumber = randomNumber;
  //   // console.log(this.randomNumber)
  // }
  //
  // getRandomNumber() {
  //   // console.log(this.randomNumber)
  //   return Token.randomNumber;
  // }


}
