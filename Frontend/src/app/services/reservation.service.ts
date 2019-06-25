import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {environment} from "../../environments/environment";
import {Reservation} from "../model/reservation";
import {catchError} from "rxjs/operators";
import {CommonService} from "./common.service";

const URL = "/api/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(environment.backend_url + URL + "/admin/reservations", reservation, {headers: this.commonService.createAuthorizationHeader()});
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(environment.backend_url + URL + "/admin/reservations" + reservation.id, reservation, {headers: this.commonService.createAuthorizationHeader()});
  }

  deleteReservation(reservation: Reservation): Observable<void> {
    return this.http.delete<void>(environment.backend_url + URL + "/admin/reservations/" + reservation.id, {headers: this.commonService.createAuthorizationHeader()});
  }

  getReservationTableRowCount(): Observable<number> {
    return this.http.get<number>(environment.backend_url + URL + "/admin/rowCount/", {headers: this.commonService.createAuthorizationHeader()});
  }

  getReservedDates(start: number, limit: number): Observable<Array<Reservation>> {
    return this.http.get<Array<Reservation>>(environment.backend_url + URL + "/admin/reservationDates/" + start + "/" + limit, {headers: this.commonService.createAuthorizationHeader()});
  }
}
