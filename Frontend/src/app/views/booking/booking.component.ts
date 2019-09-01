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
  selectedPlace: Place;
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
  swaped: boolean = false;
  polyline: any;
  marker1: any;
  marker2: any;
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

  changeCategory() {
    this.googleMapRoutes = new Array();
    this.placeLatLong = new Array<number>();
    this.placesFrom = new Array<Place>();
    this.placesTo = new Array<Place>();
    this.selectedPlace = new Place();
    this.changeRouteOnMap(null);
    // this.placeDisneyDisable = false;
    if (this.selectedCategory == 'Airport') {

      // this.placeService.getPlacesViaCategory('Private').subscribe((result) => {
      //   this.setPlaceDtos(result);
      //   for (let i = 0; i < this.placeDtos.length; i++) {
      //     this.placesFrom.push(this.placeDtos[i].place);
      //   }
      //   this.selectedFrom = this.placeDtos[0].place;
      // });
      this.placeService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        let places: Array<Place> = result;
        // this.setPlaceDtos(result);
        for (let i = 0; i < places.length; i++) {
          places[i].placeName = places[i].placeName + ' (Airport)';
          this.placesTo.push(places[i]);
        }
        this.selectedPlace = this.placesTo[0];
        this.changePlace();
      });

    } else if (this.selectedCategory == 'Disneyland') {
      // this.placeService.getPlacesViaCategory('Private').subscribe((result) => {
      //   this.setPlaceDtos(result);
      //   for (let i = 0; i < this.placeDtos.length; i++) {
      //     this.placesFrom.push(this.placeDtos[i].place);
      //   }
      //   this.selectedFrom = this.placeDtos[0].place;
      // });

      this.placeService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        let place: Place = result[0];
        this.placesTo.push(place);
        this.selectedPlace = place;
        console.log(place)
        this.changePlace();
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
    //     this.selectedPlace = this.placesTo[0];
    //   });
    //
    // }
  }

  // setPlaceDtos(places: Array<Place>) {
  //   this.placeDtos = new Array<PlaceDto>();
  //   for (let i = 0; i < places.length; i++) {
  //     let placeDto = new PlaceDto();
  //     placeDto.place = places[i];
  //     placeDto.placeDtos = this.placeDtos;
  //     this.placeDtos.push(placeDto);
  //   }
  // }


  // changeFrom() {
  //   this.placesTo = new Array<Place>();
  //   for (let i = 0; i < this.placeDtos.length; i++) {
  //     this.placesTo.push(this.placeDtos[i].place);
  //   }
  //   this.placesTo.splice(this.placesTo.indexOf(this.selectedFrom), 1);
  //   if (this.selectedFrom == this.selectedPlace) {
  //     this.selectedPlace = this.placesTo[0];
  //   }
  // }
  //
  // changePlace() {
  //
  // }

  swapePlaces() {
    if (this.swaped) {
      this.swaped = false;
    } else {
      this.swaped = true;
    }
    this.changePlace();
    // if (this.selectedCategory == 'Airport') {
    //   this.swapPlaces();
    // } else if (this.selectedCategory == 'Disneyland') {
    //   this.swapPlaces();
    //   if (this.placeDisneyDisable) {
    //     this.placeDisneyDisable = false;
    //   } else {
    //     this.placeDisneyDisable = true;
    //   }
    // }
  }

  // swapPlaces() {
  //   let placesTemp = this.placesFrom;
  //   this.placesFrom = this.placesTo;
  //   this.placesTo = placesTemp;
  //   this.selectedFrom = this.placesFrom[0];
  //   this.selectedPlace = this.placesTo[0];
  // }

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
              self.ref.detectChanges();
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
        strokeColor: '#2148ff'
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

  changePlace() {
    if (this.swaped) {
      this.placeLatLong[0] = this.selectedPlace.latitude;
      this.placeLatLong[1] = this.selectedPlace.longtitude;
    } else {
      this.placeLatLong[2] = this.selectedPlace.latitude;
      this.placeLatLong[3] = this.selectedPlace.longtitude;
    }
    this.setRoutes();
  }

  allowHighways() {
    if (this.allowHighway) {
      this.allowHighway = false;
    } else {
      this.allowHighway = true;
    }
    this.setRoutes();
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

  makeReservation() {
    let cardDto: CreditcardDto = new CreditcardDto();
    let reservationDto: ReservationDto = new ReservationDto();

    reservationDto.reservationCustomer = this.customer;
    reservationDto.reservationPlaceFrom = this.selectedFrom;
    reservationDto.reservationPlaceTo = this.selectedPlace;
    // reservation.reservationDateAndTime = this.currentDate + 'T' + this.currentTime+':00.000+0300';
    reservationDto.reservationDateAndTime = this.currentDate + ' ' + this.currentTime;
    // reservation.reservationTime = this.currentTime;
    console.log(reservationDto.reservationDateAndTime)

    cardDto.reservationDTO = reservationDto;
    this.reservationService.makeReservation(cardDto).subscribe((result) => {
      let paymentDto: PaymentDto = result;
      // console.log(sku.sku)
      stripe.redirectToCheckout({
        items: [{sku: paymentDto.sku, quantity: 1}],
        successUrl: environment.frontend_url + '/head/booking?success=' + paymentDto.reservation.reservationPaymentKey,
        cancelUrl: environment.frontend_url + '/head/booking',
      }).then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      });
    });
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

  changePassengers() {
    this.totalPassengers = this.adults + this.children;
    this.changeVehicleCategory();
  }
}
