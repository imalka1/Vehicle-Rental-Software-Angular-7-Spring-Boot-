import {Component, Input, OnInit} from '@angular/core';
import {PlaceDto} from "../../../../model/place-dto";

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {

  @Input() edit_placeDto: PlaceDto;

  constructor() {
  }

  ngOnInit() {
  }

  addPlace() {
    if (this.edit_placeDto.place != undefined) {
      this.edit_placeDto.edit = false;
    }
  }

  deletePlace() {
    // this.edit_placeDto=null;
  }
}
