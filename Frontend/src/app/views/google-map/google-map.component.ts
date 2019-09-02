import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {GooglePlace} from "./googlePlace";
import {MapsAPILoader} from "@agm/core";

declare const google: any;

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  @Input() headText:string;
  locationText: string;
  @Input() fromOrTo: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addressText') addressText: any;

  // queryWait: boolean;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
    ) {
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {

      let bounds = new Array();
      let googlePlace: GooglePlace = new GooglePlace();
      let autocomplete = new google.maps.places.Autocomplete(this.addressText.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
            if (this.locationText == 'My Location') {
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                  bounds[0] = position.coords.latitude;
                  bounds[1] = position.coords.longitude;
                  googlePlace.place = 'My Location';
                  googlePlace.bounds = bounds;
                  this.invokeEvent(googlePlace);
                });
              }
            } else {
              let place = autocomplete.getPlace();
              if (place.geometry != undefined) {
                bounds[0] = place.geometry.location.lat();
                bounds[1] = place.geometry.location.lng();
                googlePlace.place = place.name;
                googlePlace.bounds = bounds;
                this.invokeEvent(googlePlace);
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
  }

  setCurrentLocation() {
    this.locationText = 'My Location';
    let bounds = new Array();
    let googlePlace: GooglePlace = new GooglePlace();
    if (this.locationText != undefined) {
      if (this.locationText == 'My Location') {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            bounds[0] = position.coords.latitude;
            bounds[1] = position.coords.longitude;
            googlePlace.place = 'My Location';
            googlePlace.bounds = bounds;
            this.invokeEvent(googlePlace);
          });
        }
      }
    }
  }

  invokeEvent(googlePlace) {
    this.setAddress.emit(googlePlace);
  }
}
