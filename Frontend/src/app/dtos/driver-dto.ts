import {DriverVehicle} from "../model/DriverVehicle";
import {Vehicle} from "../model/Vehicle";
import {Driver} from "../model/Driver";

export class DriverDto {
  driver: Driver = new Driver();
  edit: boolean;
  driverVehicle: DriverVehicle;
  driverDtos: Array<DriverDto>;
  vehicles: Array<Vehicle>;
}
