import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PlaceDto} from "../model/place-dto";
import {environment} from "../../environments/environment";

const URL = "/place";

@Injectable({
  providedIn: 'root'
})
export class CategoryPlacesService {

  constructor(private http: HttpClient) {
  }

  getPlacesViaCategory(category: string): Observable<Array<PlaceDto>> {
    return this.http.get<Array<PlaceDto>>(environment.backend_url + URL + "/getPlacesViaCategory/" + category);
  }
}
