import {Component, OnInit} from '@angular/core';
import {PlaceDto} from "../../../dtos/place-dto";
import {Place} from "../../../model/place";
import {VehicleDto} from "../../../dtos/vehicle-dto";
import {Vehicle} from "../../../model/vehicle";
import {DriverDto} from "../../../dtos/driver-dto";
import {Driver} from "../../../model/driver";
import {DriverService} from "../../../services/driver.service";
import {VehicleService} from "../../../services/vehicle.service";

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  driverDtos: Array<DriverDto> = new Array<DriverDto>();

  constructor(
    private driverService: DriverService,
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit() {
    this.loadDrivers();
  }

  addDriver() {
    let driverDto: DriverDto = new DriverDto();
    let driver: Driver = new Driver();
    driverDto.edit = true;
    driverDto.driver = driver;
    driverDto.vehicles = this.driverDtos[0].vehicles;
    driverDto.driver.vehicle = this.driverDtos[0].vehicles[0];
    this.driverDtos.push(driverDto);
    this.driverDtos[this.driverDtos.indexOf(driverDto)].driverDtos = this.driverDtos;
  }

  loadDrivers() {
    this.driverService.getAllDrivers().subscribe((result) => {
      this.loadVehicles(result);
    })
  }

  loadVehicles(drivers) {
    this.vehicleService.getAllVehicles().subscribe((result) => {
      this.setDriverDtos(drivers, result);
    })
  }

  setDriverDtos(drivers, vehicles) {
    this.driverDtos = new Array<DriverDto>();
    for (let i = 0; i < drivers.length; i++) {
      let driverDto = new DriverDto();
      driverDto.driver = drivers[i];
      driverDto.vehicles = vehicles;
      for (var j = 0; j < vehicles.length; j++) {
        if (vehicles[j].id === driverDto.driver.vehicle.id) {
          driverDto.driver.vehicle = vehicles[j];
        }
      }
      driverDto.driverDtos = this.driverDtos;
      this.driverDtos.push(driverDto);
    }
  }
}
