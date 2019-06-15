import {Component, OnInit} from '@angular/core';
import {PlaceDto} from "../../../dtos/place-dto";
import {PlaceService} from "../../../services/place.service";
import {Place} from "../../../model/place";
import {ReservationService} from "../../../services/reservation.service";
import {ReservationDto} from "../../../dtos/reservation-dto";
import {Reservation} from "../../../model/reservation";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  reservationDtos: Array<ReservationDto>;
  totalSets: number = 0;
  setNumber: number = 1;

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.setTotalSets();
    this.setReservedDates();
  }

  setReservedDates() {
    this.reservationDtos = new Array<ReservationDto>();
    let reservations: Array<Reservation>;
    this.reservationService.getReservedDates(this.setNumber - 1, 10).subscribe((result) => {
      reservations = result;
      for (let i = 0; i < reservations.length; i++) {
        let reservationDto = new ReservationDto();
        reservationDto.reservation = reservations[i];
        // placeDto.placeDtos = this.placeDtos;
        this.reservationDtos.push(reservationDto);
      }
    })
  }

  setTotalSets() {
    this.reservationService.getReservationTableRowCount().subscribe((result) => {
      this.totalSets = Math.ceil(result/10)
    })
  }

  nextPage() {
    if (this.setNumber < this.totalSets) {
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

}
