import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PaymentService} from "../../../services/payment.service";
import {ResponseDto} from "../../../dtos/response-dto";
import {CardDto} from "../../../dtos/card-dto";
import {SkuDto} from "../../../dtos/sku-dto";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements AfterViewInit, OnDestroy {

  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;

  constructor(private cd: ChangeDetectorRef, private paymentService: PaymentService) {
  }

  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({error}) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit() {
    // const {token, error} = await stripe.createToken(this.card);
    //
    // if (error) {
    //   // console.log('Something is wrong:', error);
    // } else {
    //   console.log('Success!', token);
    //   console.log('Success!', token.id);
    //   let cardDto: CardDto = new CardDto();
    //   cardDto.email = 'imalkagunawardana1@gmail.com';
    //   cardDto.keyToken = token.id;
    //   cardDto.card = token.card.id;
    //   this.paymentService.makePayment(cardDto).subscribe((result) => {
    //     console.log(result)
    //   });
    // }
    let cardDto: CardDto = new CardDto();
    this.paymentService.makePayment(cardDto).subscribe((result) => {
      let sku: SkuDto = result;
       console.log(sku.sku)
      stripe.redirectToCheckout({
        items: [{sku: sku.sku, quantity: 1}],
        successUrl: 'http://localhost:4200/#/head/booking',
        cancelUrl: 'http://localhost:4200/#/head/booking',
      }).then(function (result) {
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `result.error.message`.
      });
    });
  }

}
