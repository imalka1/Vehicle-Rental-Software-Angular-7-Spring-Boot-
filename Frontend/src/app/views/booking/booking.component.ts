import {Component, OnInit} from '@angular/core';

declare var custom_date_picker: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  selectedCategory: string = 'airport';
  totalPassengers: number = 0;
  adults: number = 0;
  children: number = 0;

  constructor() {
  }

  ngOnInit() {

  }

  changePassengers() {
    this.totalPassengers = this.adults + this.children;
  }

  changeCategory() {

  }
}
