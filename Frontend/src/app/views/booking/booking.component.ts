import {Component, OnInit} from '@angular/core';
import {CategoryPlacesService} from "../../services/category-places.service";
import {PlaceDto} from "../../dtos/place-dto";

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
  placesFrom: Array<PlaceDto>;
  placesTo: Array<PlaceDto>;

  constructor(private categoryPlaceService: CategoryPlacesService) {
  }

  ngOnInit() {
    this.changeCategory();
  }

  changePassengers() {
    this.totalPassengers = this.adults + this.children;
  }

  changeCategory() {
    this.placesFrom = new Array<PlaceDto>();
    this.placesTo = new Array<PlaceDto>();
    let placeDtos: Array<PlaceDto>;
    this.categoryPlaceService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
      placeDtos = result;
      for (let i = 0; i < placeDtos.length; i++) {
        if (placeDtos[i].fromOrTo == 'from') {
          this.placesFrom.push(placeDtos[i]);
        } else {
          this.placesTo.push(placeDtos[i]);
        }
      }
    });
  }
}
