import {Component, OnInit} from '@angular/core';
import {Place} from "../../../model/place";
import {PlaceService} from "../../../services/place.service";
import {PlaceDto} from "../../../dtos/place-dto";


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  selectedCategory: string = 'airport';
  placeDtos: Array<PlaceDto>;

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

  addPlace() {
    let placeDto: PlaceDto = new PlaceDto();
    let place: Place = new Place();
    placeDto.edit = true;
    place.category = this.selectedCategory;
    placeDto.place = place;
    this.placeDtos.push(placeDto);
    this.placeDtos[this.placeDtos.indexOf(placeDto)].placeDtos = this.placeDtos;
  }
}
