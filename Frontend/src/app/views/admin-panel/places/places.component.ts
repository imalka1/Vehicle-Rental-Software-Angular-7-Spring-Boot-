import {Component, OnInit} from '@angular/core';
import {PlaceDto} from "../../../model/place-dto";
import {CategoryPlacesService} from "../../../services/category-places.service";


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  selectedCategory: string = 'airport';
  placeDtos: Array<PlaceDto> = new Array<PlaceDto>();

  constructor(private categoryPlaceService: CategoryPlacesService) {
  }

  ngOnInit() {
    this.changeCategory();
  }

  changeCategory() {
    if (this.selectedCategory == 'airport') {

      this.categoryPlaceService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        this.placeDtos = result;
      });

    } else if (this.selectedCategory == 'inland') {

      this.categoryPlaceService.getPlacesViaCategory(this.selectedCategory).subscribe((result) => {
        this.placeDtos = result;
      });

    }
  }
}
