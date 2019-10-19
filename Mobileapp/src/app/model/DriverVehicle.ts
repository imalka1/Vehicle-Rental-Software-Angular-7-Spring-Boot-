import {Driver} from "./Driver";
import {Vehicle} from "./Vehicle";

export class DriverVehicle {
  id: number;
  dateOfAssigned: string;
  onDuty: boolean;
  driver: Driver;
  vehicle: Vehicle;
}
