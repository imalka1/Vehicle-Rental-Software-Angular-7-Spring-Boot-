import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/common/header/header.component';
import { FooterComponent } from './views/common/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { BookingComponent } from './views/booking/booking.component';
import { SigninComponent } from './views/auth/signin/signin.component';
import {FormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import { DateComponent } from './views/booking/date/date.component';
import {HttpClientModule} from "@angular/common/http";
import { PlacesComponent } from './views/admin-panel/places/places.component';
import { VehiclesComponent } from './views/admin-panel/vehicles/vehicles.component';
import {AdminPanelComponent} from "./views/admin-panel/admin-panel.component";
import { FixedPlaceComponent } from './views/admin-panel/places/fixed-place/fixed-place.component';
import { EditPlaceComponent } from './views/admin-panel/places/edit-place/edit-place.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BookingComponent,
    SigninComponent,
    DateComponent,
    AdminPanelComponent,
    PlacesComponent,
    VehiclesComponent,
    FixedPlaceComponent,
    EditPlaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
