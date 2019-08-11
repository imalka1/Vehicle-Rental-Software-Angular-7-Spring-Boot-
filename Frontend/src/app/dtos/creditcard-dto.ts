import {Reservation} from "../model/reservation";

export class CreditcardDto {
  card: string;
  email: string;
  keyToken: string;
  amount: number;
  reservation: Reservation;
}
