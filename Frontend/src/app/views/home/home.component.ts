import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('app_place_book') appPlaceBook;
  selectedCategory: string = 'Airport';
  placeLatLong: Array<number>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.changeCategory();
  }

  changeCategory() {
    this.appPlaceBook.changeSelectedCategory(this.selectedCategory)
    this.appPlaceBook.changeRouteOnMap(null);
  }

  setPlaceLatLong(placeLatLong: Array<number>) {
    this.placeLatLong = placeLatLong;
    console.log(placeLatLong)
  }

  getRouter(){
    return this.router;
  }
}
