import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Reservation} from "../model/reservation";

const URL = "/api/reservation";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  createAuthorizationHeader() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', localStorage.getItem('token'));
    return headers;
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(environment.backend_url + URL + "/admin/reservations", reservation, {headers: this.createAuthorizationHeader()});
  }

  updateReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(environment.backend_url + URL + "/admin/reservations" + reservation.reservationId, reservation, {headers: this.createAuthorizationHeader()});
  }

  deleteReservation(reservation: Reservation): Observable<void> {
    return this.http.delete<void>(environment.backend_url + URL + "/admin/reservations/" + reservation.reservationId, {headers: this.createAuthorizationHeader()});
  }

  getReservationTableRowCount(): Observable<number> {
    return this.http.get<number>(environment.backend_url + URL + "/admin/rowCount/", {headers: this.createAuthorizationHeader()});
  }

  getReservedDates(start: number, limit: number): Observable<Array<Reservation>> {
    return this.http.get<Array<Reservation>>(environment.backend_url + URL + "/admin/reservationDates/" + start + "/" + limit, {headers: this.createAuthorizationHeader()});
  }
}
