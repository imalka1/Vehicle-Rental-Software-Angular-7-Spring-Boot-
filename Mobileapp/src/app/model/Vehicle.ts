import {DriverVehicle} from "./DriverVehicle";

export class Vehicle {
  id: string;
  vehicleName: string;
  vehicleTotalPassengers: number;
  vehicleCategory: string;
  driverVehicles: Array<DriverVehicle> = new Array<DriverVehicle>();
}
