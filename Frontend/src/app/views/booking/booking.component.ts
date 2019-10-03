import {AfterViewInit, ChangeDetectorRef, Component, OnInit, Output, ViewChild} from '@angular/core';
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
import {Customer} from "../../model/customer";
import {CustomerService} from "../../services/customer.service";
import {ReservationDto} from "../../dtos/reservation-dto";
import {VehicleService} from "../../services/vehicle.service";
import {Vehicle} from "../../model/Vehicle";
import {PlaceField} from "./place-book/place-field/placeField";
import {GoogleMapService} from "./place-book/google-map/google-map.service";
import {PlaceBookService} from "./place-book/place-book.service";

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
  // placesFrom: Array<Place>;
  // placesTo: Array<Place>;
  customer: Customer = new Customer();

  selectedVehicleCategory: string = 'car';
  vehicles: Array<Vehicle>;


  constructor(
    private placeService: PlaceService,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
    private vehicleService: VehicleService,
    private datePipe: DatePipe,
    private googleMapService: GoogleMapService,
    private placeBookService: PlaceBookService
  ) {
  }

  ngOnInit() {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.currentTime = this.datePipe.transform(new Date(), 'HH:mm');
    this.changeCategory();
    this.changeVehicleCategory();
    // this.submitReservation();
  }

  changeCategory() {
    this.placeBookService.changeSelectedCategory(this.selectedCategory)
    this.googleMapService.changeRouteOnMap(null);

  }

  // swapePlaces() {
  //   if (this.swaped) {
  //     this.swaped = false;
  //   } else {
  //     this.swaped = true;
  //   }
  //   this.googleMapRoutes = new Array<object>();
  // }
  //
  // getAddressFrom(placeField: PlaceField) {
  //   if (!this.swaped) {
  //     this.placeLatLong[0] = placeField.bounds[0];
  //     this.placeLatLong[1] = placeField.bounds[1];
  //   } else {
  //     this.placeLatLong[2] = placeField.bounds[0];
  //     this.placeLatLong[3] = placeField.bounds[1];
  //   }
  //   this.googleMapService.setRoutes(this.placeLatLong);
  // }
  //
  // getAddressTo(placeField: PlaceField) {
  //   if (this.swaped) {
  //     this.placeLatLong[0] = placeField.bounds[0];
  //     this.placeLatLong[1] = placeField.bounds[1];
  //   } else {
  //     this.placeLatLong[2] = placeField.bounds[0];
  //     this.placeLatLong[3] = placeField.bounds[1];
  //   }
  //   this.googleMapService.setRoutes(this.placeLatLong);
  // }
  //
  // changeRouteOnMap(mapRoute) {
  //   this.googleMapService.changeRouteOnMap(mapRoute);
  // }
  //
  // allowHighways() {
  //   if (this.allowHighway) {
  //     this.allowHighway = false;
  //   } else {
  //     this.allowHighway = true;
  //   }
  //   this.googleMapService.setAllow(this.allowHighway);
  // }
  //
  // setGoogleMapRoutes(googleMapRoutes) {
  //   this.googleMapRoutes = googleMapRoutes;
  //   this.ref.detectChanges();
  // }

  setPlaceLatLong(placeLatLong: Array<number>) {
    console.log(placeLatLong)
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
