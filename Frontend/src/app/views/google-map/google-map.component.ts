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
  @Input() adressType: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput: string;

  // queryWait: boolean;

  constructor() {
  }

  ngOnInit() {
    this.getPlaceAutocomplete();
  }

  ngAfterViewInit() {
    // this.getPlaceAutocomplete();
  }

  getPlaceAutocomplete() {

    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        // componentRestrictions: { country: 'US' },
        // types: [this.adressType]  // 'establishment' / 'googlePlace' / 'geocode'
        // types: ['(regions)']
      });


    // await autocomplete.addListener('place_changed', () => {
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const bounds = new Array();
      let place = autocomplete.getPlace();

      if (place.geometry != undefined) {
        bounds[0] = place.geometry.location.lat();
        bounds[1] = place.geometry.location.lng();
        let googlePlace: GooglePlace = new GooglePlace();
        googlePlace.place = place.name;
        googlePlace.bounds = bounds;
        this.invokeEvent(googlePlace);
        this.calculateDistance();
      }

    });
  }

  invokeEvent(googlePlace) {
    this.setAddress.emit(googlePlace);
  }

  calculateDistance() {
    const mexicoCity = new google.maps.LatLng(6.053519, 80.220978);
    const jacksonville = new google.maps.LatLng(6.927079, 79.861244);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(mexicoCity, jacksonville);
    console.log(distance)
  }

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
  // ngOnInit() {
  //   //set google maps defaults
  //   // this.zoom = 4;
  //   this.latitude = 39.8282;
  //   this.longitude = -98.5795;
  //
  //   //create search FormControl
  //   this.searchControl = new FormControl();
  //   const self = this;
  //   //set current position
  //   this.setCurrentPosition();
  //
  //   //load Places Autocomplete
  //   this.mapsAPILoader.load().then(() => {
  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
  //       types: ["address"]
  //     });
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         //get the place result
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //         console.log(place)
  //         //verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }
  //
  //         //set latitude, longitude and zoom
  //         this.latitude = place.geometry.location.lat();
  //         this.longitude = place.geometry.location.lng();
  //         console.log(place)
  //         // this.zoom = 12;
  //       });
  //     });
  //   });
  // }
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

}
