import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PlaceField} from "./place-field/placeField";

@Component({
  selector: 'app-place-book',
  templateUrl: './place-book.component.html',
  styleUrls: ['./place-book.component.css']
})
export class PlaceBookComponent implements OnInit {

  @ViewChild('app_google_map') appGoogleMap;
  @Output() placeLatLongOut: EventEmitter<Array<number>> = new EventEmitter();
  selectedCategory: string;
  googleMapRoutes: Array<object> = new Array<object>();
  placeLatLong: Array<number> = new Array<number>();
  allowHighway: boolean = true;
  swaped: boolean = false;

  constructor(
    private ref: ChangeDetectorRef
  ) {
  }

  ngOnInit() {

  }

  changeSelectedCategory(category) {
    this.selectedCategory = category;
  }

  swapePlaces() {
    if (this.swaped) {
      this.swaped = false;
    } else {
      this.swaped = true;
    }
    this.googleMapRoutes = new Array<object>();
  }

  getAddressFrom(placeField: PlaceField) {
    if (!this.swaped) {
      this.placeLatLong[0] = placeField.bounds[0];
      this.placeLatLong[1] = placeField.bounds[1];
    } else {
      this.placeLatLong[2] = placeField.bounds[0];
      this.placeLatLong[3] = placeField.bounds[1];
    }
    this.placeLatLongOut.emit(this.placeLatLong);
    this.appGoogleMap.setRoutes(this.placeLatLong);
  }

  getAddressTo(placeField: PlaceField) {
    if (this.swaped) {
      this.placeLatLong[0] = placeField.bounds[0];
      this.placeLatLong[1] = placeField.bounds[1];
    } else {
      this.placeLatLong[2] = placeField.bounds[0];
      this.placeLatLong[3] = placeField.bounds[1];
    }
    this.placeLatLongOut.emit(this.placeLatLong);
    this.appGoogleMap.setRoutes(this.placeLatLong);
  }

  changeRouteOnMap(mapRoute) {
    this.appGoogleMap.changeRouteOnMap(mapRoute);
  }

  allowHighways() {
    if (this.allowHighway) {
      this.allowHighway = false;
    } else {
      this.allowHighway = true;
    }
    this.appGoogleMap.setAllow(this.allowHighway);
  }

  setGoogleMapRoutes(googleMapRoutes) {
    this.googleMapRoutes = googleMapRoutes;
    this.ref.detectChanges();
  }
}
