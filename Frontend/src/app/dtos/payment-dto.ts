import {Reservation} from "../model/reservation";

export class PaymentDto {
  sku: string;
  reservation: Reservation;
}
