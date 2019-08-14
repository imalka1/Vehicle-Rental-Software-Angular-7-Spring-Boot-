import {Component, Input, OnInit} from '@angular/core';
import {DriverDto} from "../../../../dtos/driver-dto";
import {CommonService} from "../../../../services/common.service";
import {DriverService} from "../../../../services/driver.service";
import {User} from "../../../../model/user";
import {VehicleDto} from "../../../../dtos/vehicle-dto";
import {Vehicle} from "../../../../model/vehicle";
import {VehicleService} from "../../../../services/vehicle.service";

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {

  @Input() edit_driverDto: DriverDto;

  constructor(
    private commonService: CommonService,
    private driverService: DriverService,
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit() {
    this.edit_driverDto.driver.driverPresent = false;
  }

  addDriver() {
    let user: User = new User();
    user.userName = this.edit_driverDto.driver.driverEmail;
    user.userRole = 'driver';
    this.edit_driverDto.driver.user = user;
    if (this.edit_driverDto.driver.driverName != undefined && this.edit_driverDto.driver.driverContactNumber != undefined && this.edit_driverDto.driver.driverEmail != undefined && this.edit_driverDto.driver.user.userPassword != undefined) {
      if (this.edit_driverDto.driver.id != undefined) {
        this.driverService.updateDriver(this.edit_driverDto.driver).subscribe((result) => {
          this.edit_driverDto.driver = result;
          this.edit_driverDto.edit = false;
        }, (error) => {
          this.commonService.errorHandler(error)
        })
      } else {
        this.driverService.addDriver(this.edit_driverDto.driver).subscribe((result) => {
          this.edit_driverDto.driver = result;
          this.edit_driverDto.edit = false;
        }, (error) => {
          this.commonService.errorHandler(error)
        })
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
}
