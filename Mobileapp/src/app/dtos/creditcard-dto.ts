import {Reservation} from "../model/reservation";
import {ReservationDto} from "./reservation-dto";

export class CreditcardDto {
  card: string;
  email: string;
  keyToken: string;
  amount: number;
  reservationDTO: ReservationDto;
}
