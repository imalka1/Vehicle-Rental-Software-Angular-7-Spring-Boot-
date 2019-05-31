import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Place} from "../model/place";
import {environment} from "../../environments/environment";

const URL = "/api/place";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {

  }

  createAuthorizationHeader() {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Token ' +
      'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbWFsa2ExIiwidXNlcklkIjoiMiIsInJvbGUiOiJhZG1pbiIsInNlY3VyaXR5S2V5IjoxNDQ3Nzk2NzM3fQ.VwbuSdF_AnahjpGmGiYtBSHUY7CyXOEnGN0WrIsZf8ZsWZ5MoBBiyYa2M_SoJqMbwlrP4ur-7VPMMSzoYGuHAQ'
    );
    // headers = headers.append('Authorization', 'Token eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpbWFsa2ExIiwidXNlcklkIjoiMCIsInJvbGUiOiJhZG1pbiJ9.xaiM5oAKbhlsjt-rXW2ecSt93Qx9bh8Y3PhIrJiWNTAwkyOH9RpaesPPobrWYiFTxilFCilMdj45tkY3KTQYjA1');
    return headers;
  }

  addPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(environment.backend_url + URL + "/admin/places", place, {headers: this.createAuthorizationHeader()});
  }

  updatePlace(place: Place): Observable<Place> {
    return this.http.put<Place>(environment.backend_url + URL + "/admin/places/" + place.placeId, place, {headers: this.createAuthorizationHeader()});
  }

  deletePlace(place: Place): Observable<void> {
    return this.http.delete<void>(environment.backend_url + URL + "/admin/places/" + place.placeId, {headers: this.createAuthorizationHeader()});
  }

  getPlacesViaCategory(category: string): Observable<Array<Place>> {
    return this.http.get<Array<Place>>(environment.backend_url + URL + "/placesViaCategory/" + category);
  }
}
