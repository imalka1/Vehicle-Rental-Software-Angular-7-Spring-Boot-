import {Reservation} from "../model/reservation";
import {Place} from "../model/place";
import {Vehicle} from "../model/vehicle";
import {Customer} from "../model/customer";

export class ReservationDto {
  id: number;
  reservationDateAndTime: string;
  reservationDate: string;
  reservationTime: string;
  reservationCompleted: boolean;
  reservationPlaceFrom: Place;
  reservationPlaceTo: Place;
  reservationVehicle: Vehicle;
  reservationCustomer: Customer;
  reservationAmount: number;
  reservationPaymentKey: number;
}
