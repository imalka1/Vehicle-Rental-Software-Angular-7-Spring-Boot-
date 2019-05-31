import {Component, Input, OnInit} from '@angular/core';
import {PlaceDto} from "../../../../dtos/place-dto";
import {PlaceService} from "../../../../services/place.service";
import {VehicleDto} from "../../../../dtos/vehicle-dto";
import {VehicleService} from "../../../../services/vehicle.service";

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {

  @Input() edit_vehicleDto: VehicleDto;

  constructor(private vehicleService: VehicleService) {
  }

  ngOnInit() {
  }

  addVehicle() {
    if (this.edit_vehicleDto.vehicle.vehicleName != undefined) {
      if (this.edit_vehicleDto.vehicle.vehicleId != undefined) {
        this.vehicleService.updateVehicle(this.edit_vehicleDto.vehicle).subscribe((result) => {
          this.edit_vehicleDto.vehicle = result;
          this.edit_vehicleDto.edit = false;
        })
      } else {
        this.vehicleService.addVehicle(this.edit_vehicleDto.vehicle).subscribe((result) => {
          this.edit_vehicleDto.vehicle = result;
          this.edit_vehicleDto.edit = false;
        })
      }
    }
  }

  deleteVehicle() {
    if (this.edit_vehicleDto.vehicle.vehicleId != undefined) {
      this.vehicleService.deleteVehicle(this.edit_vehicleDto.vehicle).subscribe();
    }
    this.edit_vehicleDto.vehicleDtos.splice(this.edit_vehicleDto.vehicleDtos.indexOf(this.edit_vehicleDto), 1);
  }

  cancelVehicle(){
    if (this.edit_vehicleDto.vehicle.vehicleId != undefined) {
      this.edit_vehicleDto.edit = false;
    }else{
      this.edit_vehicleDto.vehicleDtos.splice(this.edit_vehicleDto.vehicleDtos.indexOf(this.edit_vehicleDto), 1);
    }
  }
}
