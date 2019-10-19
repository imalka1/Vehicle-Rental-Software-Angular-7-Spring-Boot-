import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {VehicleService} from "../../service/vehicle.service";
import {Vehicle} from "../../model/Vehicle";

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    currentDate: string;
    vehicle: Vehicle;

    constructor(private router: Router, private datePipe: DatePipe, private vehicleService: VehicleService) {
    }

    ionViewDidEnter () {
        this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        this.vehicleService.getVehicleViaUser(localStorage.getItem('user')).subscribe((vehicle) => {
            this.vehicle = vehicle;
        })
    }

}
