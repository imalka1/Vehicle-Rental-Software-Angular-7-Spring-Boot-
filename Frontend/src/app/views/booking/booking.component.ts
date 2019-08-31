import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PlaceService} from "../../services/place.service";
import {Place} from "../../model/place";
import {PlaceDto} from "../../dtos/place-dto";
import {DatePipe} from "@angular/common";
import {CreditcardDto} from "../../dtos/creditcard-dto";
import {PaymentDto} from "../../dtos/payment-dto";
import {environment} from "../../../environments/environment";
import {PaymentService} from "../../services/payment.service";
import {ActivatedRoute} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";
import {Reservation} from "../../model/reservation";
import {Customer} from "../../model/customer";
import {CustomerService} from "../../services/customer.service";
import {ReservationDto} from "../../dtos/reservation-dto";
import {VehicleService} from "../../services/vehicle.service";
import {VehicleDto} from "../../dtos/vehicle-dto";
import {Vehicle} from "../../model/Vehicle";
import {GooglePlace} from "../google-map/googlePlace";
import {MapsAPILoader} from "@agm/core";

// declare var custom_date_picker: any;
// declare const google: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  currentDate: string;
  currentTime: string;
  selectedCategory: string = 'Airport';
  selectedFrom: Place;
  selectedTo: Place;
  selectedVehicleCategory: string = 'car';
  placeDtos: Array<PlaceDto>;
  totalPassengers: number = 0;
  adults: number = 0;
  children: number = 0;
  placesFrom: Array<Place>;
  placesTo: Array<Place>;
  placeDisneyDisable: boolean = false;
  customer: Customer = new Customer();
  vehicles: Array<Vehicle>;

  placeLatLong: Array<number> = new Array<number>();
  allowHighway: boolean = true;
  googleMapRoutes: Array<object> = new Array<object>();
  selectedRoute = new Array<object>();
  map: any;

  constructor(
    private placeService: PlaceService,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
    private vehicleService: VehicleService,
    private datePipe: DatePipe,
    private ref: ChangeDetectorRef,
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
    this.currentDate = this.datePipe.transform((new Date()), 'yyyy-MM-dd');
    this.currentTime = this.datePipe.transform(new Date(), 'HH:mm');
    this.changeCategory();
    this.changeVehicleCategory();
    // this.submitReservation();
  }

  changePassengers() {
    this.totalPassengers = this.adults + this.children;
    this.changeVehicleCategory();
  }

  changeCategory() {
    this.placesFrom = new Array<Place>();
    this.placesTo = new Array<Place>();
    this.placeDisneyDisable = false;
    if (this.selectedCategory == 'Airport') {

      // this.placeService.getPlacesViaCategory('Private').subscribe((result) => {
      //   this.setPlaceDtos(result);
      //   for (let i = 0; i < this.placeDtos.length; i++) {
      //     this.placesFrom.push(this.placeDtos[i].place);
      //   }
      //   this.selectedFrom = this.placeDtos[0].place;
      // });
      this.placeService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        this.setPlaceDtos(result);
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placeDtos[i].place.placeName = this.placeDtos[i].place.placeName + ' (Airport)';
          this.placesTo.push(this.placeDtos[i].place);
        }
        this.selectedTo = this.placeDtos[0].place;
      });

    } else if (this.selectedCategory == 'Disneyland') {

      // this.placeService.getPlacesViaCategory('Private').subscribe((result) => {
      //   this.setPlaceDtos(result);
      //   for (let i = 0; i < this.placeDtos.length; i++) {
      //     this.placesFrom.push(this.placeDtos[i].place);
      //   }
      //   this.selectedFrom = this.placeDtos[0].place;
      // });

      this.placeService.getPlacesViaCategory('Disneyland').subscribe((result) => {
        let place: Place = new Place();
        place.placeName = result[0].placeName;
        this.placesTo.push(place);
        this.selectedTo = place;
        // this.placeDisneyDisable=true;
      });
    }
    // } else if (this.selectedCategory == 'Private') {
    //
    //   this.placeService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
    //     this.setPlaceDtos(result);
    //     for (let i = 0; i < this.placeDtos.length; i++) {
    //       this.placesFrom.push(this.placeDtos[i].place);
    //       this.placesTo.push(this.placeDtos[i].place);
    //     }
    //     this.selectedFrom = this.placeDtos[0].place;
    //     this.placesTo.splice(this.placesTo.indexOf(this.selectedFrom), 1);
    //     this.selectedTo = this.placesTo[0];
    //   });
    //
    // }
  }

  changeVehicleCategory() {
    let vehicle: Vehicle = new Vehicle();
    vehicle.vehicleCategory = this.selectedVehicleCategory;
    vehicle.vehicleTotalPassengers = this.totalPassengers;
    if (this.selectedVehicleCategory == 'car') {

      this.vehicleService.getVehiclesViaCategoryForReservation(vehicle).subscribe((result) => {
        this.vehicles = result;
      });

    } else if (this.selectedVehicleCategory == 'minivan') {

      this.vehicleService.getVehiclesViaCategoryForReservation(vehicle).subscribe((result) => {
        this.vehicles = result;
      });

    }
  }

  setPlaceDtos(places: Array<Place>) {
    this.placeDtos = new Array<PlaceDto>();
    for (let i = 0; i < places.length; i++) {
      let placeDto = new PlaceDto();
      placeDto.place = places[i];
      placeDto.placeDtos = this.placeDtos;
      this.placeDtos.push(placeDto);
    }
  }

  // changeFrom() {
  //   this.placesTo = new Array<Place>();
  //   for (let i = 0; i < this.placeDtos.length; i++) {
  //     this.placesTo.push(this.placeDtos[i].place);
  //   }
  //   this.placesTo.splice(this.placesTo.indexOf(this.selectedFrom), 1);
  //   if (this.selectedFrom == this.selectedTo) {
  //     this.selectedTo = this.placesTo[0];
  //   }
  // }
  //
  // changeTo() {
  //
  // }

  exchangeFromTo() {
    if (this.selectedCategory == 'Airport') {
      this.swapPlaces();
    } else if (this.selectedCategory == 'Disneyland') {
      this.swapPlaces();
      if (this.placeDisneyDisable) {
        this.placeDisneyDisable = false;
      } else {
        this.placeDisneyDisable = true;
      }
    }
  }

  swapPlaces() {
    let placesTemp = this.placesFrom;
    this.placesFrom = this.placesTo;
    this.placesTo = placesTemp;
    this.selectedFrom = this.placesFrom[0];
    this.selectedTo = this.placesTo[0];
  }

  makeReservation() {
    // let cardDto: CreditcardDto = new CreditcardDto();
    // let reservationDto: ReservationDto = new ReservationDto();
    //
    // reservationDto.reservationCustomer = this.customer;
    // reservationDto.reservationPlaceFrom = this.selectedFrom;
    // reservationDto.reservationPlaceTo = this.selectedTo;
    // // reservation.reservationDateAndTime = this.currentDate + 'T' + this.currentTime+':00.000+0300';
    // reservationDto.reservationDateAndTime = this.currentDate + ' ' + this.currentTime;
    // // reservation.reservationTime = this.currentTime;
    // console.log(reservationDto.reservationDateAndTime)
    //
    // cardDto.reservationDTO = reservationDto;
    // this.reservationService.makeReservation(cardDto).subscribe((result) => {
    //   let paymentDto: PaymentDto = result;
    //   // console.log(sku.sku)
    //   stripe.redirectToCheckout({
    //     items: [{sku: paymentDto.sku, quantity: 1}],
    //     successUrl: environment.frontend_url + '/head/booking?success=' + paymentDto.reservation.reservationPaymentKey,
    //     cancelUrl: environment.frontend_url + '/head/booking',
    //   }).then(function (result) {
    //     // If `redirectToCheckout` fails due to a browser or network
    //     // error, display the localized error message to your customer
    //     // using `result.error.message`.
    //   });
    // });

    // const mexicoCity = new google.maps.LatLng(6.053519, 80.220978);
    // const jacksonville = new google.maps.LatLng(6.927079, 79.861244);
    // const distance = google.maps.geometry.spherical.computeDistanceBetween(mexicoCity, jacksonville);
    //
    // var request = {
    //   // origin: 'Collins St, Melbourne, Australia',
    //   // destination: 'MCG Melbourne, Australia',
    //   origin: 'Jaffna, Sri Lanka',
    //   destination: 'Galle, Sri Lanka',
    //   travelMode:google.maps.TravelMode.DRIVING
    // };
    //
    // new google.maps.DirectionsService().route(request,function (response, status) {
    //   console.log(response)
    // });
    //
    // // console.log(distance/1000)
    // console.log((distance/1000).toFixed(1))

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     new google.maps.DirectionsService().route(
    //       {
    //         origin: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
    //         // destination: new google.maps.LatLng(6.927079, 79.861244),
    //         destination: 'Colombo, SriLanka',
    //         travelMode: google.maps.TravelMode.DRIVING,
    //         provideRouteAlternatives: true,
    //         avoidHighways: true,
    //
    //       },
    //       function(response, status) {
    //         console.log(response)
    //       });
    //   });
    // }


  }

  submitReservation() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['success'] != undefined) {
        // console.log(Token.randomNumber)
        // if (params['success'] == Token.randomNumber) {
        //   console.log(params['success'])
        // }
      }
    });
  }

  suggestCustomer() {
    this.customerService.getCustomerViaEmail(this.customer.customerEmail).subscribe((result) => {
      let customer: Customer = result;
      if (customer != null) {
        this.customer.id = customer.id;
        this.customer.customerName = customer.customerName;
        this.customer.customerContactNumber = customer.customerContactNumber;
      } else {
        this.customer.id = undefined;
        this.customer.customerName = '';
        this.customer.customerContactNumber = '';
      }
    })
  }

  getAddressFrom(googlePlace: GooglePlace) {
    this.placeLatLong[0] = googlePlace.bounds[0];
    this.placeLatLong[1] = googlePlace.bounds[1];
    this.setRoutes();
  }

  getAddressTo(googlePlace: GooglePlace) {
    this.placeLatLong[2] = googlePlace.bounds[0];
    this.placeLatLong[3] = googlePlace.bounds[1];
    this.setRoutes();
  }

  setRoutes() {
    if (this.placeLatLong[0] != undefined && this.placeLatLong[1] != undefined && this.placeLatLong[2] != undefined && this.placeLatLong[3] != undefined) {
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
            self.ref.detectChanges();
          }
        });

    } else {
      this.googleMapRoutes = new Array();
    }
  }

  setPlaces(response, origin, destination) {
    this.googleMapRoutes = new Array();
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


      // this.map.fitBounds(bounds);

      // marker1.setMap(this.map);
    }
    // console.log(response)
  }

  allowHighways() {
    if (this.allowHighway) {
      this.allowHighway = false;
    } else {
      this.allowHighway = true;
    }
    this.setRoutes();
  }

  changeRoute(mapRoute) {
    console.log(mapRoute)
    this.mapsAPILoader.load().then(() => {
        this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: {lat: 6.053519, lng: 80.220978},
          // mapTypeId: 'terrain'
        });
        
        new google.maps.Polyline({
          path: google.maps.geometry.encoding.decodePath(mapRoute[3]),
          map: this.map,
          strokeColor: '#2148ff'
        });

        new google.maps.Marker({
          position: mapRoute[4],
          map: this.map,
          // title: 'Hello World!'
        });

        new google.maps.Marker({
          position: mapRoute[5],
          map: this.map,
          // title: 'Hello World!'
        });
      }
    );

  }
}
