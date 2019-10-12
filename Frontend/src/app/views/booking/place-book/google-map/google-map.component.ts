import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MapsAPILoader} from "@agm/core";

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})

export class GoogleMapComponent implements OnInit {

  map: any;
  polyline: any;
  marker1: any;
  marker2: any;
  allowHighway: boolean = true;
  googleMapRoutes: Array<object> = new Array<object>();
  placeLatLong: Array<number> = new Array<number>();
  @Output() googleMapRoutesOut: EventEmitter<any> = new EventEmitter();

  constructor(
    private mapsAPILoader: MapsAPILoader,
  ) {
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: {lat: 6.053519, lng: 80.220978},
          // mapTypeId: 'terrain'
        });
      }
    );
  }

  setRoutes(placeLatLong) {
    // console.log(this.placeLatLong)
    this.placeLatLong = placeLatLong;
    this.googleMapRoutes = new Array();
    if (this.placeLatLong[0] != undefined && this.placeLatLong[1] != undefined && this.placeLatLong[2] != undefined && this.placeLatLong[3] != undefined) {
      if (this.placeLatLong[0] != this.placeLatLong[2] && this.placeLatLong[1] != this.placeLatLong[3]) {
        var self = this;
        let origin = new google.maps.LatLng(this.placeLatLong[0], this.placeLatLong[1]);
        let destination = new google.maps.LatLng(this.placeLatLong[2], this.placeLatLong[3]);
        new google.maps.DirectionsService().route(
          {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
            avoidHighways: this.allowHighway,
          },
          (response, status) => {
            if (status == google.maps.DirectionsStatus.OK) {
              self.setPlaces(response, origin, destination);
              // self.ref.detectChanges();
            }
          });
      }
    }
  }

  setPlaces(response, origin, destination) {
    let routes = response.routes;
    for (let i = 0; i < routes.length; i++) {
      let mapRoute = new Array();
      mapRoute[0] = routes[i].summary;
      mapRoute[1] = routes[i].legs[0].distance.text;
      mapRoute[2] = routes[i].legs[0].duration.text;
      mapRoute[3] = routes[i].overview_polyline;
      mapRoute[4] = origin;
      mapRoute[5] = destination;

      this.googleMapRoutes.push(mapRoute);
    }
    this.googleMapRoutesOut.emit(this.googleMapRoutes);
    // console.log(response)
  }

  changeRouteOnMap(mapRoute) {
    if (this.polyline != undefined && this.marker1 != undefined && this.marker2 != undefined) {
      this.polyline.setMap(null);
      this.marker1.setMap(null);
      this.marker2.setMap(null);
    }

    if (mapRoute != null) {
      this.polyline = new google.maps.Polyline({
        path: google.maps.geometry.encoding.decodePath(mapRoute[3]),
        map: this.map,
        strokeColor: '#4872ff',
        strokeWeight: 5,
        strokeOpacity: 0.7,
      });

      this.marker1 = new google.maps.Marker({
        position: mapRoute[4],
        map: this.map,
        // title: 'Hello World!'
      });

      this.marker2 = new google.maps.Marker({
        position: mapRoute[5],
        map: this.map,
        // title: 'Hello World!'
      });
    }
  }

  setAllow(allowHighway) {
    this.allowHighway = allowHighway;
    this.setRoutes(this.placeLatLong);
  }

}
