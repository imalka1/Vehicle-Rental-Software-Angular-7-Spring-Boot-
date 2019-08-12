import {Component, OnInit} from '@angular/core';
import {PlaceDto} from "../../../dtos/place-dto";
import {PlaceService} from "../../../services/place.service";
import {Place} from "../../../model/place";
import {ReservationService} from "../../../services/reservation.service";
import {ReservationDto} from "../../../dtos/reservation-dto";
import {Reservation} from "../../../model/reservation";
import {Router} from "@angular/router";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  reservations: Array<Reservation>;
  totalSets: Array<number>;
  setNumber: number = 1;

  constructor(private reservationService: ReservationService, private router: Router,private commonService: CommonService) {
  }

  ngOnInit() {
    this.setTotalSets();
    this.setReservedDates();
  }

  setReservedDates() {
    // this.reservationDtos = new Array<ReservationDto>();
    // let reservations: Array<Reservation>;
    this.reservationService.getReservedDates(this.setNumber - 1, 10).subscribe(
      (result) => {
      this.reservations = result;
      // for (let i = 0; i < reservations.length; i++) {
      //   let reservationDTO = new ReservationDto();
      //   reservationDTO.reservation = reservations[i];
      //   // placeDto.placeDtos = this.placeDtos;
      //   this.reservations.push(reservationDTO);
      // }
    },(error)=>{this.commonService.errorHandler(error)})
  }

  setTotalSets() {
    let count = 0;
    this.totalSets = new Array<number>();
    this.reservationService.getReservationTableRowCount().subscribe((result) => {
      for (let i = 0; i < Math.ceil(result / 10); i++) {
        this.totalSets.push(++count);
      }
    },(error)=>{this.commonService.errorHandler(error)})
  }

  nextPage() {
    if (this.setNumber < this.totalSets.length) {
      this.setNumber++;
      this.setReservedDates();
    }
  }

  previousPage() {
    if (this.setNumber > 1) {
      this.setNumber--;
      this.setReservedDates();
    }
  }

  changeSetNumber() {
    this.setReservedDates();
  }

  viewBooking() {
    this.router.navigate(['log-head/admin/view-bookings']);
  }
}
