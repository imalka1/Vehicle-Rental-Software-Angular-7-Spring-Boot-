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
    headers = headers.append('Authorization', localStorage.getItem('token'));
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
