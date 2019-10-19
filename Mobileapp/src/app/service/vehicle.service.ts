import {Injectable} from '@angular/core';

import {HttpClient} from "@angular/common/http";
import {CommonService} from "./common.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Vehicle} from "../model/Vehicle";

const URL = "/api/vehicle";

@Injectable({
    providedIn: 'root'
})

export class VehicleService {

    constructor(private http: HttpClient, private commonService: CommonService) {
    }

    getVehicleViaUser(user: string): Observable<Vehicle> {
        return this.http.get<Vehicle>(environment.backend_url + URL + "/admin/vehicleViaUser/" + user, {headers: this.commonService.createAuthorizationHeader()});
    }
}
