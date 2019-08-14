import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {Reservation} from "../model/reservation";
import {catchError} from "rxjs/operators";
import {CommonService} from "./common.service";
import {CreditcardDto} from "../dtos/creditcard-dto";
import {PaymentDto} from "../dtos/payment-dto";

const URL = "/api/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  makeReservation(card: CreditcardDto): Observable<PaymentDto> {
    return this.http.post<PaymentDto>(environment.backend_url + URL + "/make_reservation", card);
  }

  getPaymentKey(){

  }

  submitReservation(){

  }

  // addReservation(reservation: Reservation): Observable<Reservation> {
  //   return this.http.post<Reservation>(environment.backend_url + URL + "/make_reservation", reservation, {headers: this.commonService.createAuthorizationHeader()});
  // }
  //
  // updateReservation(reservation: Reservation): Observable<Reservation> {
  //   return this.http.put<Reservation>(environment.backend_url + URL + "/admin/reservations" + reservation.id, reservation, {headers: this.commonService.createAuthorizationHeader()});
  // }
  //
  // deleteReservation(reservation: Reservation): Observable<void> {
  //   return this.http.delete<void>(environment.backend_url + URL + "/admin/reservations/" + reservation.id, {headers: this.commonService.createAuthorizationHeader()});
  // }

  getReservationTableRowCount(): Observable<number> {
    return this.http.get<number>(environment.backend_url + URL + "/admin/reservations/rowCount/", {headers: this.commonService.createAuthorizationHeader()});
  }

  getReservedDates(start, limit): Observable<Array<Reservation>> {
    return this.http.get<Array<Reservation>>(environment.backend_url + URL + "/admin/reservationDates/" + start + "/" + limit, {headers: this.commonService.createAuthorizationHeader()});
  }
}
