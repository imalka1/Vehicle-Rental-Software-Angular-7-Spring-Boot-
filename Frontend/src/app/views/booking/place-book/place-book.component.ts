import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PlaceField} from "./place-field/placeField";
import {GoogleMapService} from "./google-map/google-map.service";
import {PlaceBookService} from "./place-book.service";
import {Place} from "../../../model/place";

@Component({
  selector: 'app-place-book',
  templateUrl: './place-book.component.html',
  styleUrls: ['./place-book.component.css']
})
export class PlaceBookComponent implements OnInit {

  @Output() placeLatLongOut: EventEmitter<Array<number>> = new EventEmitter();
  selectedCategory: string;
  googleMapRoutes: Array<object> = new Array<object>();
  placeLatLong: Array<number> = new Array<number>();
  allowHighway: boolean = true;
  swaped: boolean = false;

  constructor(
    private placeBookService: PlaceBookService,
    private googleMapService: GoogleMapService,
    private ref: ChangeDetectorRef
  ) {
    this.placeBookService.selectedCategory.subscribe((category) => {
      this.selectedCategory = category;
    })
  }

  ngOnInit() {

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
    this.googleMapService.setRoutes(this.placeLatLong);
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
    this.googleMapService.setRoutes(this.placeLatLong);
  }

  changeRouteOnMap(mapRoute) {
    this.googleMapService.changeRouteOnMap(mapRoute);
  }

  allowHighways() {
    if (this.allowHighway) {
      this.allowHighway = false;
    } else {
      this.allowHighway = true;
    }
    this.googleMapService.setAllow(this.allowHighway);
  }

  setGoogleMapRoutes(googleMapRoutes) {
    this.googleMapRoutes = googleMapRoutes;
    this.ref.detectChanges();
  }
}
