import {Place} from "./place";
import {Vehicle} from "./vehicle";
import {Customer} from "./customer";
import {CreditcardDto} from "../dtos/creditcard-dto";

export class Reservation {
  id: number;
  reservationDate: string;
  reservationTime: string;
  reservationCompleted: string;
  reservationPlaceFrom: Place;
  reservationPlaceTo: Place;
  reservationVehicle: Vehicle;
  reservationCustomer: Customer;
  reservationPaymentKey: number;
}
