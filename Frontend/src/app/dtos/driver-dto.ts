import {Place} from "../model/place";
import {Driver} from "../model/driver";
import {Vehicle} from "../model/vehicle";

export class DriverDto {
  driver: Driver = new Driver();
  edit: boolean;
  driverDtos: Array<DriverDto> = new Array<DriverDto>();
  vehicles: Array<Vehicle> = new Array<Vehicle>();
}
