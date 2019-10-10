import {Place} from "./place";
import {Vehicle} from "./Vehicle";
import {Customer} from "./customer";
import {CreditcardDto} from "../dtos/creditcard-dto";

export class Reservation {
  id: number;
  reservationDateAndTime: string;
  // reservationTime: string;
  reservationCompleted: string;
  reservationPlaceFromLat: number;
  reservationPlaceFromLong: number;
  reservationPlaceToLat: number;
  reservationPlaceToLong: number;
  reservationVehicle: Vehicle;
  reservationCustomer: Customer;
  reservationAmount: number;
  reservationPaymentKey: number;
}
