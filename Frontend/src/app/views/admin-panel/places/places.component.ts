import {Component, OnInit} from '@angular/core';
import {PlaceDto} from "../../../dtos/place-dto";


@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  placeDtos: Array<PlaceDto>;

  constructor() {
  }

  ngOnInit() {
  }

}
