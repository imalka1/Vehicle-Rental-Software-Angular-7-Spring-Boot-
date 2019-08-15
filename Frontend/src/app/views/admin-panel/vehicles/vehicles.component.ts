import {Component, OnInit} from '@angular/core';
import {VehicleDto} from "../../../dtos/vehicle-dto";
import {VehicleService} from "../../../services/vehicle.service";
import {Vehicle} from "../../../model/Vehicle";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {

  selectedCategory: string = 'car';
  vehicleDtos: Array<VehicleDto>;

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
    this.changeCategory();
  }

  changeCategory() {
    if (this.selectedCategory == 'car') {

      this.vehicleService.getVehiclesViaCategory(this.selectedCategory).subscribe((result) => {
        this.setVehicleDtos(result);
      });

    } else if (this.selectedCategory == 'minivan') {

      this.vehicleService.getVehiclesViaCategory(this.selectedCategory).subscribe((result) => {
        this.setVehicleDtos(result);
      });

    }
  }

  setVehicleDtos(vehicles: Array<Vehicle>) {
    this.vehicleDtos = new Array<VehicleDto>();
    for (let i = 0; i < vehicles.length; i++) {
      let vehicleDto = new VehicleDto();
      vehicleDto.vehicle = vehicles[i];
      vehicleDto.vehicleDtos = this.vehicleDtos;
      this.vehicleDtos.push(vehicleDto);
    }
  }

  addVehicle() {
    let vehicleDto: VehicleDto = new VehicleDto();
    let vehicle: Vehicle = new Vehicle();
    vehicle.vehicleTotalPassengers = 1;
    vehicleDto.edit = true;
    vehicle.vehicleCategory = this.selectedCategory;
    vehicleDto.vehicle = vehicle;
    this.vehicleDtos.push(vehicleDto);
    this.vehicleDtos[this.vehicleDtos.indexOf(vehicleDto)].vehicleDtos = this.vehicleDtos;
  }
}
