import {Component, OnInit} from '@angular/core';
import {PlaceDto} from "../../../dtos/place-dto";
import {Place} from "../../../model/place";
import {VehicleDto} from "../../../dtos/vehicle-dto";
import {Vehicle} from "../../../model/vehicle";
import {DriverDto} from "../../../dtos/driver-dto";
import {Driver} from "../../../model/driver";
import {DriverService} from "../../../services/driver.service";
import {VehicleService} from "../../../services/vehicle.service";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {

  driverDtos: Array<DriverDto> = new Array<DriverDto>();
  vehicles: Array<Vehicle> = new Array<Vehicle>();
  totalSets: Array<number>;
  setNumber: number = 1;
  driverId: string;

  constructor(
    private driverService: DriverService,
    private vehicleService: VehicleService,
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    this.loadDrivers();
    this.setTotalSets();
  }

  addDriver() {
    let driverDto: DriverDto = new DriverDto();
    let driver: Driver = new Driver();
    driverDto.edit = true;
    driverDto.driver = driver;
    driverDto.vehicles = this.vehicles;
    if (this.vehicles.length > 0) {
      driverDto.driver.vehicle = this.vehicles[0];
    }
    this.driverDtos.unshift(driverDto);
    window.scroll(0, 0);
    this.driverDtos[this.driverDtos.indexOf(driverDto)].driverDtos = this.driverDtos;
  }

  searchDriver() {
    console.log(this.driverId)
    if (this.driverId != undefined && this.driverId != '') {
      this.driverService.searchDriver(this.driverId).subscribe((result) => {
        if (result != undefined) {
          this.driverDtos = new Array<DriverDto>();
          let driverDto = new DriverDto();
          driverDto.driver = result;
          driverDto.vehicles = this.vehicles;
          for (var j = 0; j < this.vehicles.length; j++) {
            if (this.vehicles[j].id === driverDto.driver.vehicle.id) {
              driverDto.driver.vehicle = this.vehicles[j];
            }
          }
          driverDto.driverDtos = this.driverDtos;
          this.driverDtos.push(driverDto);
        }
      })
    } else {
      this.loadDrivers();
    }
  }

  loadDrivers() {
    this.driverService.getAllDrivers(this.setNumber - 1, 10).subscribe((result) => {
      if (result != undefined) {
        this.loadVehicles(result);
      }
    })
  }

  loadVehicles(drivers) {
    this.vehicleService.getAllVehicles().subscribe((result) => {
      this.vehicles = result;
      this.setDriverDtos(drivers, result);
    })
  }

  setDriverDtos(drivers, vehicles) {
    this.driverDtos = new Array<DriverDto>();
    for (let i = 0; i < drivers.length; i++) {
      let driverDto = new DriverDto();
      driverDto.driver = drivers[i];
      driverDto.vehicles = this.vehicles;
      for (var j = 0; j < vehicles.length; j++) {
        if (vehicles[j].id === driverDto.driver.vehicle.id) {
          driverDto.driver.vehicle = vehicles[j];
        }
      }
      driverDto.driverDtos = this.driverDtos;
      this.driverDtos.push(driverDto);
    }
  }

  setTotalSets() {
    let count = 0;
    this.totalSets = new Array<number>();
    this.driverService.getDriverTableRowCount().subscribe((result) => {
      for (let i = 0; i < Math.ceil(result / 10); i++) {
        this.totalSets.push(++count);
      }
    }, (error) => {
      this.commonService.errorHandler(error)
    })
  }

  nextPage() {
    if (this.setNumber < this.totalSets.length) {
      this.setNumber++;
      this.loadDrivers();
    }
  }

  previousPage() {
    if (this.setNumber > 1) {
      this.setNumber--;
      this.loadDrivers();
    }
  }
}
