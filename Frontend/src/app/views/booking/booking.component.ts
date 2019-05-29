import {Component, OnInit} from '@angular/core';
import {PlaceService} from "../../services/place.service";
import {Place} from "../../model/place";
import {PlaceDto} from "../../dtos/place-dto";
import {DatePipe} from "@angular/common";

// declare var custom_date_picker: any;

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  currentDate: string;
  currentTime: string;
  selectedCategory: string = 'airport';
  selectedFrom: Place;
  selectedTo: Place;
  placeDtos: Array<PlaceDto>;
  totalPassengers: number = 0;
  adults: number = 0;
  children: number = 0;
  placesFrom: Array<Place>;
  placesTo: Array<Place>;
  placeDisneyDisable: boolean = false;

  constructor(private placeService: PlaceService, private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.currentDate = this.datePipe.transform((new Date()), 'yyyy-MM-dd');
    this.currentTime = this.datePipe.transform(new Date(), 'HH:mm');
    this.changeCategory();
  }

  changePassengers() {
    this.totalPassengers = this.adults + this.children;
  }

  changeCategory() {
    this.placesFrom = new Array<Place>();
    this.placesTo = new Array<Place>();
    this.placeDisneyDisable = false;
    if (this.selectedCategory == 'airport') {

      this.placeService.getPlacesViaCategory('private').subscribe((result) => {
        this.setPlaceDtos(result);
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placesFrom.push(this.placeDtos[i].place);
        }
        this.selectedFrom = this.placeDtos[0].place;
      });
      this.placeService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        this.setPlaceDtos(result);
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placeDtos[i].place.placeName = this.placeDtos[i].place.placeName + ' (Airport)';
          this.placesTo.push(this.placeDtos[i].place);
        }
        this.selectedTo = this.placeDtos[0].place;
      });

    } else if (this.selectedCategory == 'disneyland') {

      this.placeService.getPlacesViaCategory('private').subscribe((result) => {
        this.setPlaceDtos(result);
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placesFrom.push(this.placeDtos[i].place);
        }
        this.selectedFrom = this.placeDtos[0].place;
        let place: Place = new Place();
        place.placeName = 'Disneyland';
        this.placesTo.push(place);
        this.selectedTo = place;
      });

    } else if (this.selectedCategory == 'private') {

      this.placeService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        this.setPlaceDtos(result);
        for (let i = 0; i < this.placeDtos.length; i++) {
          this.placesFrom.push(this.placeDtos[i].place);
          this.placesTo.push(this.placeDtos[i].place);
        }
        this.selectedFrom = this.placeDtos[0].place;
        this.placesTo.splice(this.placesTo.indexOf(this.selectedFrom), 1);
        this.selectedTo = this.placesTo[0];
      });

    }
  }

  setPlaceDtos(places: Array<Place>) {
    this.placeDtos = new Array<PlaceDto>();
    for (let i = 0; i < places.length; i++) {
      let placeDto = new PlaceDto();
      placeDto.place = places[i];
      placeDto.placeDtos = this.placeDtos;
      this.placeDtos.push(placeDto);
    }
  }

  changeFrom() {
    this.placesTo = new Array<Place>();
    for (let i = 0; i < this.placeDtos.length; i++) {
      this.placesTo.push(this.placeDtos[i].place);
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
