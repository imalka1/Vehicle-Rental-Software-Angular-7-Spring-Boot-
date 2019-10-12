import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {BookingPage} from './booking.page';
import {GoogleMapComponent} from "./google-map/google-map.component";
import {AgmCoreModule} from "@agm/core";
import {AgmDirectionModule} from "agm-direction";

const routes: Routes = [
    {
        path: '',
        component: BookingPage
    }
];

@NgModule({
    imports: [
        // AgmCoreModule.forRoot({
        //     apiKey: "AIzaSyBjKRweni7QSt1dWrc9izjXd7OHC9GYew4",
        //     libraries: ["geometry", "places"]
        // }),
        AgmDirectionModule,
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [BookingPage,GoogleMapComponent]
})
export class BookingPageModule {
}
