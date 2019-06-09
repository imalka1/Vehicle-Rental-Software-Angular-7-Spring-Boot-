import {Component, OnInit} from '@angular/core';
import {PlaceDto} from "../../../dtos/place-dto";
import {PlaceService} from "../../../services/place.service";
import {Place} from "../../../model/place";

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  selectedCategory: string = 'airport';
  placeDtos: Array<PlaceDto>;
  totalSets: number = 20;
  setNumber: number = 1;

  constructor(private placeService: PlaceService) {
  }

  ngOnInit() {
    this.changeCategory();
  }

  changeCategory() {
    if (this.selectedCategory == 'airport') {

      this.placeService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        this.setPlaceDtos(result);
      });

    } else if (this.selectedCategory == 'private') {

      this.placeService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        this.setPlaceDtos(result);
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

  nextPage() {
    this.setNumber++;
  }

  previousPage() {
    if (this.setNumber > 1) {
      this.setNumber--;
    }
  }

}
