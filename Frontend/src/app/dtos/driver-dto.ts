import {DriverVehicle} from "../model/DriverVehicle";
import {Vehicle} from "../model/Vehicle";
import {Driver} from "../model/Driver";

export class DriverDto {
  driver: Driver = new Driver();
  edit: boolean;
  driverDtos: Array<DriverDto> = new Array<DriverDto>();
  vehicles: Array<Vehicle> = new Array<Vehicle>();
}
