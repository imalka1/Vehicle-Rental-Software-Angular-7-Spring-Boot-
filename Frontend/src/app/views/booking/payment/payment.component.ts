import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PaymentService} from "../../../services/payment.service";
import {CreditcardDto} from "../../../dtos/creditcard-dto";
import {PaymentDto} from "../../../dtos/payment-dto";
import {environment} from "../../../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {Token} from "../../../model/token";
import {ReservationService} from "../../../services/reservation.service";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit {

  @ViewChild('cardInfo') cardInfo: ElementRef;

  // card: any;
  // cardHandler = this.onChange.bind(this);
  // error: string;

  constructor(
    private cd: ChangeDetectorRef,
    private paymentService: PaymentService,
    private reservationService: ReservationService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  // ngAfterViewInit() {
  //   this.card = elements.create('card');
  //   this.card.mount(this.cardInfo.nativeElement);
  //
  //   this.card.addEventListener('change', this.cardHandler);
  // }
  //
  // ngOnDestroy() {
  //   this.card.removeEventListener('change', this.cardHandler);
  //   this.card.destroy();
  // }
  //
  // onChange({error}) {
  //   if (error) {
  //     this.error = error.message;
  //   } else {
  //     this.error = null;
  //   }
  //   this.cd.detectChanges();
  // }

  onSubmit() {
    // const {token, error} = await stripe.createToken(this.card);
    //
    // if (error) {
    //   // console.log('Something is wrong:', error);
    // } else {
    //   console.log('Success!', token);
    //   console.log('Success!', token.id);
    //   let cardDto: CreditcardDto = new CreditcardDto();
    //   cardDto.email = 'imalkagunawardana1@gmail.com';
    //   cardDto.keyToken = token.id;
    //   cardDto.card = token.card.id;
    //   this.paymentService.makePayment(cardDto).subscribe((result) => {
    //     console.log(result)
    //   });
    // }

    let cardDto: CreditcardDto = new CreditcardDto();
    this.paymentService.makePayment(cardDto).subscribe((result) => {
      let sku: PaymentDto = result;
      let randomNumber = Math.floor(Math.random() * 100000000) + 1000000000;
      console.log(sku.sku)
      stripe.redirectToCheckout({
        items: [{sku: sku.sku, quantity: 1}],
        successUrl: environment.frontend_url + '/head/booking?success=' + randomNumber,
        cancelUrl: environment.frontend_url + '/head/booking',
      }).then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      });
    });
    // console.log(Math.floor(Math.random()* 100000000)+100000000)
  }

  ngOnInit(): void {
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
