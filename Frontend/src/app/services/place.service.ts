import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Place} from "../model/place";
import {environment} from "../../environments/environment";
import {catchError} from "rxjs/operators";
import {CommonService} from "./common.service";

const URL = "/api/place";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient, private commonService: CommonService) {

  }

  addPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(environment.backend_url + URL + "/admin/places/add", place, {headers: this.commonService.createAuthorizationHeader()});
  }

  updatePlace(place: Place): Observable<Place> {
    return this.http.post<Place>(environment.backend_url + URL + "/admin/places/update", place, {headers: this.commonService.createAuthorizationHeader()});
  }

  deletePlace(place: Place): Observable<void> {
    return this.http.delete<void>(environment.backend_url + URL + "/admin/places/" + place.id, {headers: this.commonService.createAuthorizationHeader()});
  }

  getPlacesViaCategory(category: string): Observable<Array<Place>> {
    return this.http.get<Array<Place>>(environment.backend_url + URL + "/placesViaCategory/" + category);
  }
}
