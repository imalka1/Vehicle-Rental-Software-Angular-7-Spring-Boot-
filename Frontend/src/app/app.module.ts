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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    BookingComponent,
    SigninComponent,
    DateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
