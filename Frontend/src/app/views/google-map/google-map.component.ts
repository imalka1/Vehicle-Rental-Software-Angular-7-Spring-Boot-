import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {GooglePlace} from "./googlePlace";
import {FormControl} from "@angular/forms";
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

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      let bounds = new Array();
      let googlePlace: GooglePlace = new GooglePlace();
      let autocomplete = new google.maps.places.Autocomplete(this.addressText.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // //get the place result
          // let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // console.log(place)
          // //verify result
          // if (place.geometry === undefined || place.geometry === null) {
          //   return;
          // }
          // if (this.locationText != undefined) {
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
          // }
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

  // calculateDistance() {
  //   const mexicoCity = new google.maps.LatLng(6.053519, 80.220978);
  //   const jacksonville = new google.maps.LatLng(6.927079, 79.861244);
  //   const distance = google.maps.geometry.spherical.computeDistanceBetween(mexicoCity, jacksonville);
  //   console.log(distance)
  // }

  //
  // public latitude: number;
  // public longitude: number;
  // public searchControl: FormControl;
  // public zoom: number;
  //
  // @ViewChild("search")
  // public searchElementRef: ElementRef;
  //
  // constructor(
  //   private mapsAPILoader: MapsAPILoader,
  //   private ngZone: NgZone
  // ) {}
  //

  //
  // private setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }
  // getPlaceAutocomplete() {
  //   // const autocomplete = new google.maps.places.Autocomplete(this.addressText.nativeElement,
  //   //   {
  //   //     // componentRestrictions: { country: 'US' },
  //   //     // types: [this.adressType]  // 'establishment' / 'googlePlace' / 'geocode'
  //   //     // types: ['(regions)']
  //   //   });
  //   let bounds = new Array();
  //   let googlePlace: GooglePlace = new GooglePlace();
  //   const autocomplete = new google.maps.places.Autocomplete(this.addressText.nativeElement);
  //   google.maps.event.addListener(autocomplete, 'place_changed', () => {
  //     if (this.locationText != undefined) {
  //       if (this.locationText == 'My Location') {
  //         if (navigator.geolocation) {
  //           navigator.geolocation.getCurrentPosition((position) => {
  //             bounds[0] = position.coords.latitude;
  //             bounds[1] = position.coords.longitude;
  //             googlePlace.place = 'My Location';
  //             googlePlace.bounds = bounds;
  //             googlePlace.fromOrTo = this.fromOrTo;
  //             this.invokeEvent(googlePlace);
  //           });
  //         }
  //       } else {
  //         let place = autocomplete.getPlace();
  //         if (place.geometry != undefined) {
  //           bounds[0] = place.geometry.location.lat();
  //           bounds[1] = place.geometry.location.lng();
  //           googlePlace.place = place.name;
  //           googlePlace.bounds = bounds;
  //           googlePlace.fromOrTo = this.fromOrTo;
  //           this.invokeEvent(googlePlace);
  //         }
  //       }
  //     }
  //   });
  //
  //   if (this.locationText != undefined) {
  //     if (this.locationText == 'My Location') {
  //       if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition((position) => {
  //           bounds[0] = position.coords.latitude;
  //           bounds[1] = position.coords.longitude;
  //           googlePlace.place = 'My Location';
  //           googlePlace.bounds = bounds;
  //           googlePlace.fromOrTo = this.fromOrTo;
  //           this.invokeEvent(googlePlace);
  //         });
  //       }
  //     }
  //   }
  //
  // }

}
