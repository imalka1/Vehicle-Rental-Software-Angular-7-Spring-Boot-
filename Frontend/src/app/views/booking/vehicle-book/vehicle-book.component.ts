import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Vehicle} from "../../../model/Vehicle";
import {VehicleService} from "../../../services/vehicle.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-vehicle-book',
  templateUrl: './vehicle-book.component.html',
  styleUrls: ['./vehicle-book.component.css']
})
export class VehicleBookComponent implements OnInit {

  @Output() vehicleOut: EventEmitter<Vehicle> = new EventEmitter();
  currentDate: string;
  currentTime: string;
  selectedVehicleCategory: string = 'car';
  vehicles: Array<Vehicle>;
  totalPassengers: number = 0;
  adults: number = 0;
  children: number = 0;

  constructor(
    private vehicleService: VehicleService,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit() {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.currentTime = this.datePipe.transform(new Date(), 'HH:mm');
  }

  changeVehicleCategory() {
    let vehicle: Vehicle = new Vehicle();
    vehicle.vehicleCategory = this.selectedVehicleCategory;
    vehicle.vehicleTotalPassengers = this.totalPassengers;
    if (this.selectedVehicleCategory == 'car') {

      this.vehicleService.getVehiclesViaCategoryForReservation(vehicle).subscribe((result) => {
        this.vehicles = result;
      });

    } else if (this.selectedVehicleCategory == 'minivan') {

      this.vehicleService.getVehiclesViaCategoryForReservation(vehicle).subscribe((result) => {
        this.vehicles = result;
      });

    }
  }

  changePassengers() {
    this.totalPassengers = this.adults + this.children;
    this.changeVehicleCategory();
  }

  selectVehicle(vehicle: Vehicle) {
    this.vehicleOut.emit(vehicle)
  }
}
