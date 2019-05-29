import {Injectable} from '@angular/core';
import {Place} from "../model/place";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Vehicle} from "../model/vehicle";

const URL = "/api/vehicle";

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) {
  }

  addVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(environment.backend_url + URL + "/vehicles", vehicle);
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(environment.backend_url + URL + "/vehicles/" + vehicle.vehicleId, vehicle);
  }

  deleteVehicle(vehicle: Vehicle): Observable<void> {
    return this.http.delete<void>(environment.backend_url + URL + "/vehicles/" + vehicle.vehicleId);
  }

  getVehiclesViaCategory(category: string): Observable<Array<Vehicle>> {
    return this.http.get<Array<Vehicle>>(environment.backend_url + URL + "/vehiclesViaCategory/" + category);
  }
}
