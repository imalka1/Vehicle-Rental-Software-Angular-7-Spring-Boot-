import {Component, Input, OnInit} from '@angular/core';
import {PlaceDto} from "../../../../dtos/place-dto";
import {VehicleDto} from "../../../../dtos/vehicle-dto";

@Component({
  selector: 'app-fixed-vehicle',
  templateUrl: './fixed-vehicle.component.html',
  styleUrls: ['./fixed-vehicle.component.css']
})
export class FixedVehicleComponent implements OnInit {

  @Input() fixed_vehicleDto: VehicleDto;

  constructor() {
  }

  ngOnInit() {
  }

  editPlace() {
    this.fixed_vehicleDto.edit = true;
  }

}
