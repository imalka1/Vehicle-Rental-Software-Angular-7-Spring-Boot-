import {Component, Input, OnInit} from '@angular/core';
import {DriverVehicleDto} from "../../../../dtos/driverVehicle-dto";
import {VehicleDto} from "../../../../dtos/vehicle-dto";
import {Vehicle} from "../../../../model/Vehicle";
import {VehicleService} from "../../../../services/vehicle.service";
import {DriverService} from "../../../../services/driver.service";
import {CommonService} from "../../../../services/common.service";
import {DriverDto} from "../../../../dtos/driver-dto";

@Component({
  selector: 'app-fixed-driver',
  templateUrl: './fixed-driver.component.html',
  styleUrls: ['./fixed-driver.component.css']
})
export class FixedDriverComponent implements OnInit {

  @Input() fixed_driverDto: DriverDto;

  constructor(
    private commonService: CommonService,
    private driverService: DriverService,
    private vehicleService: VehicleService
  ) {
  }

  ngOnInit() {

  }

  editDriver() {
    this.fixed_driverDto.edit = true;
  }

  // updateVehicleOrPresent() {
  //   this.driverService.updateDriver(this.fixed_driverDto.driver).subscribe((result) => {
  //     this.fixed_driverDto.driver = result;
  //     this.vehicleService.getFreeVehicles().subscribe((result) => {
  //       for (var j = 0; j < this.fixed_driverDto.driverDtos.length; j++) {
  //         this.fixed_driverDto.driverDtos[j].vehicles = result;
  //       }
  //       this.fixed_driverDto.vehicles.push(this.fixed_driverDto.driver.vehicle);
  //     })
  //   }, (error) => {
  //     this.commonService.errorHandler(error)
  //   })
  // }
}
