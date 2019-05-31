import {Component, Input, OnInit} from '@angular/core';
import {PlaceService} from "../../../../services/place.service";
import {PlaceDto} from "../../../../dtos/place-dto";

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css']
})
export class EditPlaceComponent implements OnInit {

  @Input() edit_placeDto: PlaceDto;

  constructor(private placeService: PlaceService) {
  }

  ngOnInit() {
  }

  addPlace() {
    if (this.edit_placeDto.place != undefined) {
      if (this.edit_placeDto.place.placeId != undefined) {
        this.placeService.updatePlace(this.edit_placeDto.place).subscribe((result) => {
          this.edit_placeDto.place = result;
          this.edit_placeDto.edit = false;
        })
      } else {
        this.placeService.addPlace(this.edit_placeDto.place).subscribe((result) => {
          this.edit_placeDto.place = result;
          this.edit_placeDto.edit = false;
        })
      }
    }
  }

  deletePlace() {
    if (this.edit_placeDto.place.placeId != undefined) {
      this.placeService.deletePlace(this.edit_placeDto.place).subscribe();
    }
    this.edit_placeDto.placeDtos.splice(this.edit_placeDto.placeDtos.indexOf(this.edit_placeDto), 1);
  }

  cancelPlace(){
    if (this.edit_placeDto.place.placeId != undefined) {
      this.edit_placeDto.edit = false;
    }else{
      this.edit_placeDto.placeDtos.splice(this.edit_placeDto.placeDtos.indexOf(this.edit_placeDto), 1);
    }
  }
}
