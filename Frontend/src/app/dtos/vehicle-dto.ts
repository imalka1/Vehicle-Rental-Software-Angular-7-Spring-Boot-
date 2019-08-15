import {Vehicle} from "../model/Vehicle";

export class VehicleDto {
  vehicle: Vehicle;
  edit: boolean;
  vehicleDtos: Array<VehicleDto>;
}
