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
import {GooglePlace} from "../pickup_details/google-map/googlePlace";
import {MapsAPILoader} from "@agm/core";
import {PlaceField} from "../pickup_details/place-field/placeField";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  currentDate: string;
  currentTime: string;

  selectedCategory: string = 'Airport';
  selectedPlaceFrom: Place;
  selectedPlaceTo: Place;
  placeDtos: Array<PlaceDto>;
  totalPassengers: number = 0;
  adults: number = 0;
  children: number = 0;
  placesFrom: Array<Place>;
  placesTo: Array<Place>;
  customer: Customer = new Customer();

  selectedVehicleCategory: string = 'car';
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
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
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
    this.selectedPlaceTo = new Place();
    this.swaped=false;
    this.changeRouteOnMap(null);

  }

  swapePlaces() {
    if (this.swaped) {
      this.swaped = false;
    } else {
      this.swaped = true;
    }
  }

  getAddressFrom(placeField: PlaceField) {
    if (!this.swaped) {
      this.placeLatLong[0] = placeField.bounds[0];
      this.placeLatLong[1] = placeField.bounds[1];
    } else {
      this.placeLatLong[2] = placeField.bounds[0];
      this.placeLatLong[3] = placeField.bounds[1];
    }
    this.setRoutes();
  }

  getAddressTo(placeField: PlaceField) {
    if (this.swaped) {
      this.placeLatLong[0] = placeField.bounds[0];
      this.placeLatLong[1] = placeField.bounds[1];
    } else {
      this.placeLatLong[2] = placeField.bounds[0];
      this.placeLatLong[3] = placeField.bounds[1];
    }
    this.setRoutes();
  }

  setRoutes() {
    // console.log(this.placeLatLong)
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
    reservationDto.reservationPlaceFrom = this.selectedPlaceFrom;
    reservationDto.reservationPlaceTo = this.selectedPlaceTo;
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
