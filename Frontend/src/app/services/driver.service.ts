import {Injectable} from '@angular/core';
import {Driver} from "../model/Driver";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./common.service";
import {Place} from "../model/place";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

const URL = "/api/driver";

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient, private commonService: CommonService) {
  }


  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(environment.backend_url + URL + "/admin/drivers/add", driver, {headers: this.commonService.createAuthorizationHeader()});
  }
  //
  // updateDriver(driver: Driver): Observable<Driver> {
  //   return this.http.post<Driver>(environment.backend_url + URL + "/admin/drivers/update", driver, {headers: this.commonService.createAuthorizationHeader()});
  // }
  //
  deleteDriver(driver: Driver): Observable<void> {
    return this.http.delete<void>(environment.backend_url + URL + "/admin/drivers/" + driver.id, {headers: this.commonService.createAuthorizationHeader()});
  }

  getAllDrivers(start, limit): Observable<Array<Driver>> {
    return this.http.get<Array<Driver>>(environment.backend_url + URL + "/admin/drivers/" + start + "/" + limit, {headers: this.commonService.createAuthorizationHeader()});
  }

  getDriverTableRowCount(): Observable<number> {
    return this.http.get<number>(environment.backend_url + URL + "/admin/drivers/rowCount/", {headers: this.commonService.createAuthorizationHeader()});
  }

  searchDriver(driverId): Observable<Driver> {
    return this.http.get<Driver>(environment.backend_url + URL + "/admin/drivers/" + driverId, {headers: this.commonService.createAuthorizationHeader()});
  }
}
