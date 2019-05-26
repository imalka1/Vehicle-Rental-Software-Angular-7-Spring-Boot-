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
  selectedFrom: PlaceDto;
  selectedTo: PlaceDto;
  placeDtos: Array<PlaceDto>;
  totalPassengers: number = 0;
  adults: number = 0;
  children: number = 0;
  placesFrom: Array<PlaceDto>;
  placesTo: Array<PlaceDto>;
  placeDisneyDisable: boolean = false;

  // placeDisneyToDisable: boolean = false;

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
    this.placeDisneyDisable = false;
    if (this.selectedCategory == 'airport') {

      this.categoryPlaceService.getPlacesViaCategory('inland').subscribe((result) => {
        this.placeDtos = result;
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placesFrom.push(this.placeDtos[i]);
        }
        this.selectedFrom = this.placeDtos[0];
      });
      this.categoryPlaceService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        this.placeDtos = result;
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placesTo.push(this.placeDtos[i]);
        }
        this.selectedTo = this.placeDtos[0];
      });

    } else if (this.selectedCategory == 'disneyland') {

      this.categoryPlaceService.getPlacesViaCategory('inland').subscribe((result) => {
        this.placeDtos = result;
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placesFrom.push(this.placeDtos[i]);
        }
        this.selectedFrom = this.placeDtos[0];
        let placeDto: PlaceDto = new PlaceDto();
        placeDto.place = 'Disneyland';
        this.placesTo.push(placeDto);
        this.selectedTo = placeDto;
      });

    } else if (this.selectedCategory == 'inland') {

      this.categoryPlaceService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        this.placeDtos = result;
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placesFrom.push(this.placeDtos[i]);
          this.placesTo.push(this.placeDtos[i]);
        }
        this.selectedFrom = this.placeDtos[0];
        this.placesTo.splice(this.placesTo.indexOf(this.selectedFrom), 1);
        this.selectedTo = this.placesTo[0];
      });

    }
  }

  changeFrom() {

    this.placesTo = new Array<PlaceDto>();
    for (let i = 0; i < this.placeDtos.length; i++) {
      this.placesTo.push(this.placeDtos[i]);
    }
    this.placesTo.splice(this.placesTo.indexOf(this.selectedFrom), 1);
    if (this.selectedFrom == this.selectedTo) {
      this.selectedTo = this.placesTo[0];
    }
  }

  changeTo() {

  }

  exchangeFromTo() {
    if (this.selectedCategory == 'airport') {
      let placesTemp = this.placesFrom;
      this.placesFrom = this.placesTo;
      this.placesTo = placesTemp;
      this.selectedFrom = this.placesFrom[0];
      this.selectedTo = this.placesTo[0];
    } else if (this.selectedCategory == 'disneyland') {
      let placesTemp = this.placesFrom;
      this.placesFrom = this.placesTo;
      this.placesTo = placesTemp;
      this.selectedFrom = this.placesFrom[0];
      this.selectedTo = this.placesTo[0];
      if (this.placeDisneyDisable) {
        this.placeDisneyDisable = false;
      } else {
        this.placeDisneyDisable = true;
      }
    }
  }
}
