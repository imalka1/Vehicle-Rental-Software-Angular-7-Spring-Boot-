import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/common/header/header.component';
import { FooterComponent } from './views/common/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { BookingComponent } from './views/booking/booking.component';
import { SigninComponent } from './views/auth/signin/signin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import { DateComponent } from './views/booking/date/date.component';
import {HttpClientModule} from "@angular/common/http";
import { PlacesComponent } from './views/admin-panel/places/places.component';
import { VehiclesComponent } from './views/admin-panel/vehicles/vehicles.component';
import {AdminPanelComponent} from "./views/admin-panel/admin-panel.component";
import { FixedPlaceComponent } from './views/admin-panel/places/fixed-place/fixed-place.component';
import { EditPlaceComponent } from './views/admin-panel/places/edit-place/edit-place.component';
import { EditVehicleComponent } from './views/admin-panel/vehicles/edit-vehicle/edit-vehicle.component';
import { FixedVehicleComponent } from './views/admin-panel/vehicles/fixed-vehicle/fixed-vehicle.component';
import { BookingsComponent } from './views/admin-panel/bookings/bookings.component';
import { ViewBookingsComponent } from './views/admin-panel/bookings/view-bookings/view-bookings.component';
import { DriversComponent } from './views/admin-panel/drivers/drivers.component';
import { EditDriverComponent } from './views/admin-panel/drivers/edit-driver/edit-driver.component';
import { FixedDriverComponent } from './views/admin-panel/drivers/fixed-driver/fixed-driver.component';
import { GoogleMapComponent } from './views/google-map/google-map.component';
import {AgmCoreModule} from "@agm/core";
import { CarouselComponent } from './views/common/carousel/carousel.component';

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
    EditPlaceComponent,
    EditVehicleComponent,
    FixedVehicleComponent,
    BookingsComponent,
    ViewBookingsComponent,
    DriversComponent,
    EditDriverComponent,
    FixedDriverComponent,
    GoogleMapComponent,
    CarouselComponent
  ],
  imports: [
    // AgmCoreModule.forRoot({
    //   apiKey: "AIzaSyCHmY6hmHn8__TO-Swq9iYIM1QhYodd7fQ",
    //   libraries: ["geometry"]
    // }),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
