import {Reservation} from "../model/reservation";
import {Place} from "../model/place";
import {Vehicle} from "../model/Vehicle";
import {Customer} from "../model/customer";

export class ReservationDto {
  id: number;
  reservationDateAndTime: string;
  reservationDate: string;
  reservationTime: string;
  reservationCompleted: boolean;
  reservationPlaceFromLat: number;
  reservationPlaceFromLong: number;
  reservationPlaceToLat: number;
  reservationPlaceToLong: number;
  reservationVehicle: Vehicle;
  reservationCustomer: Customer;
  reservationAmount: number;
  reservationPaymentKey: number;
}
