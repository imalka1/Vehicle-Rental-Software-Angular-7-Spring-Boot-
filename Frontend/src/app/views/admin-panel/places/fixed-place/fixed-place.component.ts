import {Component, Input, OnInit} from '@angular/core';
import {Place} from "../../../../model/place";
import {PlaceDto} from "../../../../dtos/place-dto";

@Component({
  selector: 'app-fixed-place',
  templateUrl: './fixed-place.component.html',
  styleUrls: ['./fixed-place.component.css']
})
export class FixedPlaceComponent implements OnInit {

  @Input() fixed_placeDto: PlaceDto;

  constructor() {
  }

  ngOnInit() {
  }

  editPlace() {
    this.fixed_placeDto.edit = true;
  }
}
