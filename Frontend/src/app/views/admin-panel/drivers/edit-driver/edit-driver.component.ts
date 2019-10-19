import {Component, Input, OnInit} from '@angular/core';
import {CommonService} from "../../../../services/common.service";
import {DriverService} from "../../../../services/driver.service";
import {Vehicle} from "../../../../model/Vehicle";
import {VehicleService} from "../../../../services/vehicle.service";
import {DriverVehicleService} from "../../../../services/driver-vehicle.service";
import {DriverDto} from "../../../../dtos/driver-dto";

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

  }

  addDriver() {
    if (this.edit_driverDto.driver.user.id == undefined) {
      this.edit_driverDto.driver.user.userName = this.edit_driverDto.driver.user.userEmail;
      this.edit_driverDto.driver.user.userRole = 'driver';
    }
    if (this.edit_driverDto.driver.user.userName != undefined && this.edit_driverDto.driver.driverContactNumber != undefined && this.edit_driverDto.driver.user.userEmail != undefined && this.edit_driverDto.driver.user.userPassword != undefined) {
      this.edit_driverDto.driverVehicle.dateOfAssigned = null;
      // console.log(this.edit_driverDto.driver)
      this.driverService.addDriver(this.edit_driverDto.driver).subscribe((result) => {
        this.edit_driverDto.driver = result;
        this.edit_driverDto.edit = false;
        this.setVehicle();
      }, (error) => {
        this.commonService.errorHandler(error)
      });
    }
  }

  addVehicle() {
    this.edit_driverDto.driverVehicle.vehicle = this.selectedVehicle;
    for (let i = 0; i < this.edit_driverDto.driver.driverVehicles.length; i++) {
      this.edit_driverDto.driver.driverVehicles[i].onDuty = false;
    }
    if (this.edit_driverDto.driverVehicle.vehicle != null) {
      this.edit_driverDto.driverVehicle.onDuty = true;
      this.edit_driverDto.driver.driverVehicles.unshift(this.edit_driverDto.driverVehicle)
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
    })
  }
}
