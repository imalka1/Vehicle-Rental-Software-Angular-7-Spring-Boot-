import {Component, OnInit} from '@angular/core';
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
import {Vehicle} from "../../model/vehicle";

// declare var custom_date_picker: any;

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

  constructor(
    private placeService: PlaceService,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
    private vehicleService: VehicleService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.currentDate = this.datePipe.transform((new Date()), 'yyyy-MM-dd');
    this.currentTime = this.datePipe.transform(new Date(), 'HH:mm');
    this.changeCategory();
    this.changeVehicleCategory();

    this.submitReservation();
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

      this.placeService.getPlacesViaCategory('Private').subscribe((result) => {
        this.setPlaceDtos(result);
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placesFrom.push(this.placeDtos[i].place);
        }
        this.selectedFrom = this.placeDtos[0].place;
      });
      this.placeService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        this.setPlaceDtos(result);
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placeDtos[i].place.placeName = this.placeDtos[i].place.placeName + ' (Airport)';
          this.placesTo.push(this.placeDtos[i].place);
        }
        this.selectedTo = this.placeDtos[0].place;
      });

    } else if (this.selectedCategory == 'Disneyland') {

      this.placeService.getPlacesViaCategory('Private').subscribe((result) => {
        this.setPlaceDtos(result);
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placesFrom.push(this.placeDtos[i].place);
        }
        this.selectedFrom = this.placeDtos[0].place;
      });

      this.placeService.getPlacesViaCategory('Disneyland').subscribe((result) => {
        let place: Place = new Place();
        place.placeName = result[0].placeName;
        this.placesTo.push(place);
        this.selectedTo = place;
      });

    } else if (this.selectedCategory == 'Private') {

      this.placeService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        this.setPlaceDtos(result);
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placesFrom.push(this.placeDtos[i].place);
          this.placesTo.push(this.placeDtos[i].place);
        }
        this.selectedFrom = this.placeDtos[0].place;
        this.placesTo.splice(this.placesTo.indexOf(this.selectedFrom), 1);
        this.selectedTo = this.placesTo[0];
      });

    }
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

  changeFrom() {
    this.placesTo = new Array<Place>();
    for (let i = 0; i < this.placeDtos.length; i++) {
      this.placesTo.push(this.placeDtos[i].place);
    }
    this.placesTo.splice(this.placesTo.indexOf(this.selectedFrom), 1);
    if (this.selectedFrom == this.selectedTo) {
      this.selectedTo = this.placesTo[0];
    }
  }

  changeTo() {

  }

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
    let cardDto: CreditcardDto = new CreditcardDto();
    let reservationDto: ReservationDto = new ReservationDto();

    reservationDto.reservationCustomer = this.customer;
    reservationDto.reservationPlaceFrom = this.selectedFrom;
    reservationDto.reservationPlaceTo = this.selectedTo;
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
}
