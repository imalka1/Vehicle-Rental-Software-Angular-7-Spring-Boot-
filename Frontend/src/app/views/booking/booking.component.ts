import {AfterViewInit, ChangeDetectorRef, Component, OnInit, Output, ViewChild} from '@angular/core';
import {PlaceService} from "../../services/place.service";
import {Place} from "../../model/place";
import {PlaceDto} from "../../dtos/place-dto";
import {DatePipe} from "@angular/common";
import {CreditcardDto} from "../../dtos/creditcard-dto";
import {PaymentDto} from "../../dtos/payment-dto";
import {environment} from "../../../environments/environment";
import {PaymentService} from "../../services/payment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservationService} from "../../services/reservation.service";
import {Customer} from "../../model/customer";
import {CustomerService} from "../../services/customer.service";
import {ReservationDto} from "../../dtos/reservation-dto";
import {Vehicle} from "../../model/Vehicle";

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  @ViewChild('app_place_book') appPlaceBook;
  currentDate: string;
  currentTime: string;

  selectedCategory: string = 'Airport';
  // selectedPlaceFrom: Place;
  // selectedPlaceTo: Place;
  placeDtos: Array<PlaceDto>;
  placeLatLong: Array<number>;
  customer: Customer = new Customer();
  vehicle: Vehicle;

  constructor(
    private placeService: PlaceService,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private reservationService: ReservationService,
    private datePipe: DatePipe,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.currentTime = this.datePipe.transform(new Date(), 'HH:mm');
    this.changeCategory();
    this.submitReservation();
  }

  changeCategory() {
    this.appPlaceBook.changeSelectedCategory(this.selectedCategory)
    this.appPlaceBook.changeRouteOnMap(null);
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

  setPlaceLatLong(placeLatLong: Array<number>) {
    this.placeLatLong = placeLatLong;
    console.log(placeLatLong)
  }

  setVehicle(vehicle: Vehicle) {
    console.log(vehicle)
  }

  makeReservation() {
    let cardDto: CreditcardDto = new CreditcardDto();
    let reservationDto: ReservationDto = new ReservationDto();

    reservationDto.reservationCustomer = this.customer;
    reservationDto.reservationPlaceFromLat = this.placeLatLong[0];
    reservationDto.reservationPlaceFromLong = this.placeLatLong[1];
    reservationDto.reservationPlaceToLat = this.placeLatLong[2];
    reservationDto.reservationPlaceToLong = this.placeLatLong[3];
    // reservation.reservationDateAndTime = this.currentDate + 'T' + this.currentTime+':00.000+0300';
    reservationDto.reservationDateAndTime = this.currentDate + ' ' + this.currentTime;
    // reservation.reservationTime = this.currentTime;
    // console.log(reservationDto.reservationDateAndTime)

    cardDto.reservationDTO = reservationDto;
    this.reservationService.makeReservation(cardDto).subscribe((result) => {
      let paymentDto: PaymentDto = result;
      // console.log(sku.sku)
      stripe.redirectToCheckout({
        items: [{sku: paymentDto.sku, quantity: 1}],
        successUrl: environment.frontend_url + '/head/carousel/booking?success=' + paymentDto.reservation.reservationPaymentKey,
        // successUrl: this.router.navigate(['/head/carousel/booking'], {queryParams: {success: paymentDto.reservation.reservationPaymentKey}}),
        cancelUrl: environment.frontend_url + '/head/carousel/booking',
        // cancelUrl: this.router.navigate(['/head/carousel/booking']),
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


}
