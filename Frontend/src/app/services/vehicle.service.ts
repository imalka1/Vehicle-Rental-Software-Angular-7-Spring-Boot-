import {Injectable} from '@angular/core';
import {Place} from "../model/place";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Vehicle} from "../model/vehicle";

const URL = "/api/vehicle";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) {
  }

  createAuthorizationHeader() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbWFsa2EiLCJ1c2VySWQiOiIwIiwicm9sZSI6ImFkbWluIn0.EwdNxt_M8LNLTUpqTqnow_IJ5BFeHZbzOjPC5qz7jODFGEp9m-SC-x0ZBrucF9BVZTDaVqfqLJCuodu96o0c8A');
    // headers = headers.append('Authorization', 'Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbWFsa2ExIiwidXNlcklkIjoiMCIsInJvbGUiOiJhZG1pbiJ9.xaiM5oAKbhlsjt-rXW2ecSt93Qx9bh8Y3PhIrJiWNTAwkyOH9RpaesPPobrWYiFTxilFCilMdj45tkY3KTQYjA1');
    return headers;
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(environment.backend_url + URL + "/admin/vehicles", vehicle, {headers: this.createAuthorizationHeader()});
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(environment.backend_url + URL + "/admin/vehicles/" + vehicle.vehicleId, vehicle, {headers: this.createAuthorizationHeader()});
  }

  deleteVehicle(vehicle: Vehicle): Observable<void> {
    return this.http.delete<void>(environment.backend_url + URL + "/admin/vehicles/" + vehicle.vehicleId, {headers: this.createAuthorizationHeader()});
  }

  getVehiclesViaCategory(category: string): Observable<Array<Vehicle>> {
    return this.http.get<Array<Vehicle>>(environment.backend_url + URL + "/vehiclesViaCategory/" + category);
  }
}
