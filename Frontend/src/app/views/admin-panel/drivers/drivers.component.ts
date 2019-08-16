import {Component, OnInit} from '@angular/core';
import {PlaceDto} from "../../../dtos/place-dto";
import {Place} from "../../../model/place";
import {VehicleDto} from "../../../dtos/vehicle-dto";
import {Vehicle} from "../../../model/Vehicle";
import {DriverVehicleDto} from "../../../dtos/driverVehicle-dto";
import {Driver} from "../../../model/Driver";
import {DriverService} from "../../../services/driver.service";
import {VehicleService} from "../../../services/vehicle.service";
import {CommonService} from "../../../services/common.service";
import {DriverDto} from "../../../dtos/driver-dto";
import {DriverVehicle} from "../../../model/DriverVehicle";

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
    this.driverDtos = new Array<DriverDto>();
    this.loadDrivers();
    this.setTotalSets();
  }

  addDriver() {
    // let driverDto: DriverDto = new DriverDto();
    let driverDto: DriverDto = this.setDriverDto(new Driver());
    driverDto.edit = true;
    driverDto.driverVehicle.vehicle=null;
    driverDto.driver.driverPresent=false;
    // driverDto.edit = true;
    // driverDto.driver = driver;
    // driverDto.driver.driverVehicles[0] = new DriverVehicle();
    // driverDto.vehicles = this.vehicles;
    // if (this.vehicles.length > 0) {
    //   driverDto.vehicles = this.vehicles;
    // }
    // this.driverDtos.unshift(driverDto);
    // window.scroll(0, 0);
    // this.driverDtos[this.driverDtos.indexOf(driverDto)].driverDtos = this.driverDtos;
  }

  searchDriver() {
    if (this.driverId != undefined && this.driverId != '') {
      this.driverService.searchDriver(this.driverId).subscribe((result) => {
        if (result != undefined) {
          this.driverDtos = new Array<DriverDto>();
          let driverDto = new DriverDto();
          driverDto.driver = result;
          driverDto.vehicles = this.vehicles;
          for (var j = 0; j < this.vehicles.length; j++) {
            if (this.vehicles[j].id === driverDto.driver.driverVehicles[0].vehicle.id) {
              driverDto.driver.driverVehicles[0].vehicle = this.vehicles[j];
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
    this.vehicleService.getFreeVehicles().subscribe((result) => {
      this.vehicles = result;
      for (let i = 0; i < drivers.length; i++) {
        console.log(drivers[i])
        this.setDriverDto(drivers[i]);
      }
    })
  }

  setDriverDto(driver) {
    // for (let i = 0; i < drivers.length; i++) {
    let driverDto = new DriverDto();
    driverDto.driverVehicle = new DriverVehicle();
    driverDto.driver = driver;
    driverDto.vehicles = this.vehicles;
    driverDto.edit = false;
    for (let i = 0; i < driverDto.driver.driverVehicles.length; i++) {
      if (driverDto.driver.driverVehicles[i].onDuty == true) {
        for (let j = 0; j < driverDto.vehicles.length; j++) {
          if (driverDto.driver.driverVehicles[i].vehicle.id === driverDto.vehicles[j].id) {
            driverDto.driverVehicle.vehicle = driverDto.vehicles[j];
          }
        }
        // console.log(this.driverVehicle)
      }
      //   this.edit_driverDto.driver.driverVehicles[i].onDuty = false;
    }
    // driverDto.vehicles.push(driverDto.driver.vehicle);
    // for (var j = 0; j < driverDto.vehicles.length; j++) {
    //   if (driverDto.vehicles[j].id === driverDto.driver.vehicle.id) {
    //     driverDto.driver.vehicle = driverDto.vehicles[j];
    //   }
    // }
    driverDto.driverDtos = this.driverDtos;
    this.driverDtos.unshift(driverDto);
    return driverDto;
    // }
    // console.log(this.driverDtos)
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
