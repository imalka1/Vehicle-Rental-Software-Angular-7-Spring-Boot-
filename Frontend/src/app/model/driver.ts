import {User} from "./user";
import {Vehicle} from "./Vehicle";
import {DriverVehicle} from "./DriverVehicle";

export class Driver {
  id: string;
  driverName: string;
  driverEmail: string;
  driverContactNumber: string;
  driverPresent: boolean;
  driverVehicles: Array<DriverVehicle> = new Array<DriverVehicle>();
  user: User = new User();
}
