import {Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {MapsAPILoader} from "@agm/core";
import {Place} from "../../../model/place";
import {PlaceDto} from "../../../dtos/place-dto";
import {PlaceService} from "../../../services/place.service";
import {PlaceField} from "./placeField";

@Component({
  selector: 'app-place-field',
  templateUrl: './place-field.component.html',
  styleUrls: ['./place-field.component.css']
})
export class PlaceFieldComponent implements OnInit {

  @Input() headText: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @Input() selectedCategory: string;
  @Input() componentCategory: string;

  locationText: string;
  @Input() fromOrTo: string;
  @ViewChild('addressText') addressText: any;

  selectedPlace: Place = new Place();
  places: Array<Place> = new Array<Place>();
  // @Output() selectedPlaceOut: EventEmitter<any> = new EventEmitter();

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private placeService: PlaceService
  ) {
  }

  ngOnInit() {
    let bounds = new Array();
    let placeField: PlaceField = new PlaceField();
    if (this.selectedCategory == 'GoogleMap') {

      this.mapsAPILoader.load().then(() => {

        let autocomplete = new google.maps.places.Autocomplete(this.addressText.nativeElement);
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            if (this.locationText == 'My Location') {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  bounds[0] = position.coords.latitude;
                  bounds[1] = position.coords.longitude;
                  placeField.place = 'My Location';
                  placeField.bounds = bounds;
                  this.invokeEvent(placeField);
                });
              }
            } else {
              let place = autocomplete.getPlace();
              // console.log(place.formatted_address)
              if (place.geometry != undefined) {
                bounds[0] = place.geometry.location.lat();
                bounds[1] = place.geometry.location.lng();
                placeField.place = place.name;
                placeField.bounds = bounds;
                this.invokeEvent(placeField);
              }
            }
          });
        });
        // if (this.locationText != undefined) {
        //   if (this.locationText == 'My Location') {
        //     if (navigator.geolocation) {
        //       navigator.geolocation.getCurrentPosition((position) => {
        //         bounds[0] = position.coords.latitude;
        //         bounds[1] = position.coords.longitude;
        //         googlePlace.place = 'My Location';
        //         googlePlace.bounds = bounds;
        //         this.invokeEvent(googlePlace);
        //       });
        //     }
        //   }
        // }
      });

    } else if (this.selectedCategory == 'Airport' && this.componentCategory == 'select_field') {

      this.placeService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        let places: Array<Place> = result;
        for (let i = 0; i < places.length; i++) {
          places[i].placeName = places[i].placeName + ' (Airport)';
          this.places.push(places[i]);
        }
        this.selectedPlace = this.places[0];
        this.changePlace();
      });

    } else if (this.selectedCategory == 'Disneyland' && this.componentCategory == 'disabled_field') {

      this.placeService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        let place: Place = result[0];
        this.places.push(place);
        this.selectedPlace = place;
        this.changePlace();
      });

    }
  }

  changePlace() {
    let bounds = new Array();
    let placeField: PlaceField = new PlaceField();
    bounds[0] = this.selectedPlace.latitude;
    bounds[1] = this.selectedPlace.longitude;
    placeField.place = this.selectedPlace.placeName;
    placeField.bounds = bounds;
    this.invokeEvent(placeField);
  }

  // setCurrentLocation() {
  //   this.locationText = 'My Location';
  //   let bounds = new Array();
  //   let googlePlace: GooglePlace = new GooglePlace();
  //   if (this.locationText != undefined) {
  //     if (this.locationText == 'My Location') {
  //       if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition((position) => {
  //           bounds[0] = position.coords.latitude;
  //           bounds[1] = position.coords.longitude;
  //           googlePlace.place = 'My Location';
  //           googlePlace.bounds = bounds;
  //           this.invokeEvent(googlePlace);
  //         });
  //       }
  //     }
  //   }
  // }

  invokeEvent(googlePlace) {
    this.setAddress.emit(googlePlace);
  }

}
