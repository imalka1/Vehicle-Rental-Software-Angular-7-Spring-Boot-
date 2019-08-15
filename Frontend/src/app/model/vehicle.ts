import {DriverVehicle} from "./DriverVehicle";

export class Vehicle {
  id: number;
  vehicleName: string;
  vehicleTotalPassengers: number;
  vehicleCategory: string;
  driverVehicles: Array<DriverVehicle> = new Array<DriverVehicle>();
}
