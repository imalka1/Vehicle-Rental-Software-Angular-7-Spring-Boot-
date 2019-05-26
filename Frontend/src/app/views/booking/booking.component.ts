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
  totalPassengers: number = 0;
  adults: number = 0;
  children: number = 0;
  placesFrom: Array<PlaceDto>;
  placesTo: Array<PlaceDto>;
  placeDisneyFromDisable: boolean = false;
  placeDisneyToDisable: boolean = false;

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
    if (this.selectedCategory == 'airport') {

      this.placeDisneyToDisable = false;
      this.categoryPlaceService.getPlacesViaCategory('inland').subscribe((result) => {
        placeDtos = result;
        for (let i = 0; i < placeDtos.length; i++) {
          this.placesFrom.push(placeDtos[i]);
        }
        this.selectedFrom = placeDtos[0];
      });
      this.categoryPlaceService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        placeDtos = result;
        for (let i = 0; i < placeDtos.length; i++) {
          this.placesTo.push(placeDtos[i]);
        }
        this.selectedTo = placeDtos[0];
      });

    } else if (this.selectedCategory == 'disneyland') {

      this.placeDisneyToDisable = true;
      this.categoryPlaceService.getPlacesViaCategory('inland').subscribe((result) => {
        placeDtos = result;
        for (let i = 0; i < placeDtos.length; i++) {
          this.placesFrom.push(placeDtos[i]);
        }
        this.selectedFrom = placeDtos[0];
        let placeDto: PlaceDto = new PlaceDto();
        placeDto.place = 'Disneyland';
        this.placesTo.push(placeDto)
        this.selectedTo = placeDto;
      });

    } else if (this.selectedCategory == 'inland') {

      this.placeDisneyToDisable = false;
      this.categoryPlaceService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        placeDtos = result;
        for (let i = 0; i < placeDtos.length; i++) {
          this.placesFrom.push(placeDtos[i]);
          this.placesTo.push(placeDtos[i]);
        }
        this.selectedFrom = placeDtos[0];
        this.selectedTo = placeDtos[0];
      });

    }
  }

  changeFrom() {
    console.log(this.selectedFrom.place)
  }

  changeTo() {

  }

  exchangeFromTo() {

  }
}
