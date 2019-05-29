import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Place} from "../model/place";
import {environment} from "../../environments/environment";

const URL = "/api/place";

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private http: HttpClient) {
  }

  addPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(environment.backend_url + URL + "/places", place);
  }

  updatePlace(place: Place): Observable<Place> {
    return this.http.put<Place>(environment.backend_url + URL + "/places/" + place.placeId, place);
  }

  deletePlace(place: Place): Observable<void> {
    return this.http.delete<void>(environment.backend_url + URL + "/places/" + place.placeId);
  }

  getPlacesViaCategory(category: string): Observable<Array<Place>> {
    return this.http.get<Array<Place>>(environment.backend_url + URL + "/placesViaCategory/" + category);
  }
}
