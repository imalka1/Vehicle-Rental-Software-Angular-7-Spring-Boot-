import {Place} from "../model/place";

export class PlaceDto {
  place: Place;
  edit: boolean;
  placeDtos: Array<PlaceDto>;
}
