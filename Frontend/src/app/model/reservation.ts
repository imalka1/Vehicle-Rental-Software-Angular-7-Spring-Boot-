import {Place} from "./place";
import {Vehicle} from "./vehicle";

export class Reservation {
  reservationId: number;
  dateOfReservation: string;
  timeOfReservation: string;
  place: Place;
  vehicle: Vehicle;
}
