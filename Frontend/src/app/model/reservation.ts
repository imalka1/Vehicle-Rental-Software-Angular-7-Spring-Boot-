import {Place} from "./place";
import {Vehicle} from "./Vehicle";
import {Customer} from "./customer";
import {CreditcardDto} from "../dtos/creditcard-dto";

export class Reservation {
  id: number;
  reservationDateAndTime: string;
  // reservationTime: string;
  reservationCompleted: string;
  reservationPlaceFrom: Place;
  reservationPlaceTo: Place;
  reservationVehicle: Vehicle;
  reservationCustomer: Customer;
  reservationAmount: number;
  reservationPaymentKey: number;
}
