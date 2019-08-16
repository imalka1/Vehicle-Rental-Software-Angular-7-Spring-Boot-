import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./common.service";
import {Driver} from "../model/Driver";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {DriverVehicle} from "../model/DriverVehicle";

const URL = "/api/driver_vehicle";

@Injectable({
  providedIn: 'root'
})
export class DriverVehicleService {

  constructor(private http: HttpClient, private commonService: CommonService) {
  }

  addDriver(driver: DriverVehicle): Observable<DriverVehicle> {
    return this.http.post<DriverVehicle>(environment.backend_url + URL + "/admin/drivers/add", driver, {headers: this.commonService.createAuthorizationHeader()});
  }

  // updateDriver(driver: Driver): Observable<DriverVehicle> {
  //   return this.http.post<DriverVehicle>(environment.backend_url + URL + "/admin/drivers/update", driver, {headers: this.commonService.createAuthorizationHeader()});
  // }
}
