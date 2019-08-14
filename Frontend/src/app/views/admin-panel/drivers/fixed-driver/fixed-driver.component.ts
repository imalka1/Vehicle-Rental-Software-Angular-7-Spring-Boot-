import {Component, Input, OnInit} from '@angular/core';
import {DriverDto} from "../../../../dtos/driver-dto";
import {VehicleDto} from "../../../../dtos/vehicle-dto";
import {Vehicle} from "../../../../model/vehicle";
import {VehicleService} from "../../../../services/vehicle.service";
import {DriverService} from "../../../../services/driver.service";
import {CommonService} from "../../../../services/common.service";

@Component({
  selector: 'app-fixed-driver',
  templateUrl: './fixed-driver.component.html',
  styleUrls: ['./fixed-driver.component.css']
})
export class FixedDriverComponent implements OnInit {

  @Input() fixed_driverDto: DriverDto;

  constructor(
    private commonService: CommonService,
    private driverService: DriverService
  ) {
  }

  ngOnInit() {

  }

  editDriver() {
    this.fixed_driverDto.edit = true;
  }

  updateVehicleOrPresent(){
    this.driverService.updateDriver(this.fixed_driverDto.driver).subscribe((result) => {
      this.fixed_driverDto.driver = result;
      for (var j = 0; j < this.fixed_driverDto.vehicles.length; j++) {
        if (this.fixed_driverDto.vehicles[j].id === this.fixed_driverDto.driver.vehicle.id) {
          this.fixed_driverDto.driver.vehicle = this.fixed_driverDto.vehicles[j];
        }
      }
    }, (error) => {
      this.commonService.errorHandler(error)
    })
  }
}
