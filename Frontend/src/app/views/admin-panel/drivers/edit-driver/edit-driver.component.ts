import {Component, Input, OnInit} from '@angular/core';
import {DriverVehicleDto} from "../../../../dtos/driverVehicle-dto";
import {CommonService} from "../../../../services/common.service";
import {DriverService} from "../../../../services/driver.service";
import {User} from "../../../../model/user";
import {VehicleDto} from "../../../../dtos/vehicle-dto";
import {Vehicle} from "../../../../model/Vehicle";
import {VehicleService} from "../../../../services/vehicle.service";
import {DriverVehicleService} from "../../../../services/driver-vehicle.service";
import {DriverVehicle} from "../../../../model/DriverVehicle";
import {DriverDto} from "../../../../dtos/driver-dto";
import {Driver} from "../../../../model/Driver";

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {

  @Input() edit_driverDto: DriverDto;
  selectedVehicle: Vehicle = null;

  constructor(
    private commonService: CommonService,
    private driverVehicleService: DriverVehicleService,
    private driverService: DriverService,
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit() {
    this.edit_driverDto.driver.driverPresent = false;
    for (let i = 0; i < this.edit_driverDto.driver.driverVehicles.length; i++) {
      this.edit_driverDto.driver.driverVehicles[i].onDuty = false;
    }
  }

  addDriver() {
    // let driverVehicle = new DriverVehicle();
    // driverVehicle.driver = this.edit_driverDto.driver;
    // driverVehicle.driver.driverVehicles = this.edit_driverDto.driver.driverVehicles;
    if (this.edit_driverDto.driver.user.id == undefined) {
      this.edit_driverDto.driver.user.userName = this.edit_driverDto.driver.driverEmail;
      this.edit_driverDto.driver.user.userRole = 'driver';
    }
    if (this.edit_driverDto.driver.driverName != undefined && this.edit_driverDto.driver.driverContactNumber != undefined && this.edit_driverDto.driver.driverEmail != undefined && this.edit_driverDto.driver.user.userPassword != undefined) {
      // if (this.edit_driverDto.driver.id != undefined) {
      console.log(this.edit_driverDto.driver)
      this.driverService.addDriver(this.edit_driverDto.driver).subscribe((result) => {
        this.edit_driverDto.driver = result;
        this.edit_driverDto.edit = false;
        this.setVehicle();
      }, (error) => {
        this.commonService.errorHandler(error)
      });
      // } else {
      //   this.driverVehicleService.addDriver(this.edit_driverDto.driver).subscribe((result) => {
      //     this.edit_driverDto.driver.driverVehicles[0] = result;
      //     this.edit_driverDto.edit = false;
      //     this.setVehicle();
      //   }, (error) => {
      //     this.commonService.errorHandler(error)
      //   })
      // }
    }
  }

  addVehicle() {
    for (let i = 0; i < this.edit_driverDto.driver.driverVehicles.length; i++) {
      this.edit_driverDto.driver.driverVehicles[i].onDuty = false;
    }
    if (this.selectedVehicle != null) {
      let driverVehicle = new DriverVehicle();
      driverVehicle.vehicle = this.selectedVehicle;
      driverVehicle.onDuty = true;
      if (this.edit_driverDto.driver.user.id == undefined) {
        this.edit_driverDto.driver.driverVehicles[0] = driverVehicle;
      } else {
        this.edit_driverDto.driver.driverVehicles.unshift(driverVehicle)
      }
    }
  }

  deleteDriver() {
    if (this.edit_driverDto.driver.id != undefined) {
      this.driverService.deleteDriver(this.edit_driverDto.driver).subscribe((data) => {
        },
        (error) => {
          this.commonService.errorHandler(error)
        });
    }
    this.edit_driverDto.driverDtos.splice(this.edit_driverDto.driverDtos.indexOf(this.edit_driverDto), 1);
  }

  cancelDriver() {
    if (this.edit_driverDto.driver.id != undefined) {
      this.edit_driverDto.edit = false;
    } else {
      this.edit_driverDto.driverDtos.splice(this.edit_driverDto.driverDtos.indexOf(this.edit_driverDto), 1);
    }
  }

  setVehicle() {
    this.vehicleService.getFreeVehicles().subscribe((result) => {
      for (var j = 0; j < this.edit_driverDto.driverDtos.length; j++) {
        this.edit_driverDto.driverDtos[j].vehicles = result;
      }
      // this.edit_driverDto.vehicles.push(this.edit_driverDto.driver.vehicle);
    })
  }
}
