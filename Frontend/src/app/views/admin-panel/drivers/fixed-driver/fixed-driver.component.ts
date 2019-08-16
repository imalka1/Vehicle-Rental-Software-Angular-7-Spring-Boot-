import {Component, Input, OnInit} from '@angular/core';
import {DriverDto} from "../../../../dtos/driver-dto";
import {DriverVehicle} from "../../../../model/DriverVehicle";

@Component({
  selector: 'app-fixed-driver',
  templateUrl: './fixed-driver.component.html',
  styleUrls: ['./fixed-driver.component.css']
})
export class FixedDriverComponent implements OnInit {

  @Input() fixed_driverDto: DriverDto;
  driverVehicle: DriverVehicle = new DriverVehicle();

  constructor(
  ) {
  }

  ngOnInit() {
    for (let i = 0; i < this.fixed_driverDto.driver.driverVehicles.length; i++) {
      if (this.fixed_driverDto.driver.driverVehicles[i].onDuty == true) {
        this.driverVehicle.vehicle = this.fixed_driverDto.driver.driverVehicles[i].vehicle;
      }
    }
  }

  editDriver() {
    this.fixed_driverDto.edit = true;
  }
}
