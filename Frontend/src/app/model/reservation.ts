import {Place} from "./place";
import {Vehicle} from "./vehicle";
import {Customer} from "./customer";

export class Reservation {
  id: number;
  reservationDate: string;
  reservationTime: string;
  reservationCompleted: string;
  reservationPlaceFrom: Place;
  reservationPlaceTo: Place;
  reservationVehicle: Vehicle;
  reservationCustomer: Customer;
}
