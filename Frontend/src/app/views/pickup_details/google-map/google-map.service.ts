import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  changeRouteOnMapVar: Subject<any> = new Subject<any>();
  setRoutesVar: Subject<any> = new Subject<any>();
  setAllowVar: Subject<any> = new Subject<any>();

  constructor() {
  }

  changeRouteOnMap(value) {
    this.changeRouteOnMapVar.next(value)
  }

  setRoutes(value){
    this.setRoutesVar.next(value)
  }

  setAllow(value) {
    this.setAllowVar.next(value)
  }
}
