import {Component, OnInit} from '@angular/core';
import {PlaceDto} from "../../../model/place-dto";


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  selectedCategory: string = 'airport';
  placeDtos: Array<PlaceDto>=new Array<PlaceDto>();

  constructor() {
  }

  ngOnInit() {
  }

}
