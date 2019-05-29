import {Vehicle} from "../model/vehicle";

export class VehicleDto {
  vehicle: Vehicle;
  edit: boolean;
  vehicleDtos: Array<VehicleDto>;
}
