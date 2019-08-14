import {User} from "./user";
import {Vehicle} from "./vehicle";

export class Driver {
  id: number;
  driverName: string;
  driverEmail: string;
  driverContactNumber: string;
  driverPresent: boolean;
  vehicle: Vehicle = new Vehicle();
  user: User = new User();
}
