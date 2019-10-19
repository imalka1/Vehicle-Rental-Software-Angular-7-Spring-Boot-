import {Place} from "../model/place";
import {Driver} from "../model/Driver";
import {Vehicle} from "../model/Vehicle";
import {DriverVehicle} from "../model/DriverVehicle";

export class DriverVehicleDto {
  driverVehicle: DriverVehicle;
  edit: boolean;
  driverVehicleDtos: Array<DriverVehicleDto>;
  vehicles: Array<Vehicle>;
}
