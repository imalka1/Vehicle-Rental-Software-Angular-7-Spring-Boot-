import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HeaderComponent} from "./views/common/header/header.component";
import {HomeComponent} from "./views/home/home.component";
import {SigninComponent} from "./views/auth/signin/signin.component";
import {BookingComponent} from "./views/booking/booking.component";
import {AdminPanelComponent} from "./views/admin-panel/admin-panel.component";
import {LoginGuard} from "./guards/login.guard";
import {PlacesComponent} from "./views/admin-panel/places/places.component";
import {VehiclesComponent} from "./views/admin-panel/vehicles/vehicles.component";
import {BookingsComponent} from "./views/admin-panel/bookings/bookings.component";
import {ViewBookingsComponent} from "./views/admin-panel/bookings/view-bookings/view-bookings.component";
import {PaymentGuard} from "./guards/payment.guard";

const routes: Routes = [
  {
    path: 'log-head',
    component: HeaderComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'admin',
        component: AdminPanelComponent,
        children: [
          {
            path: 'place',
            component: PlacesComponent
          },
          {
            path: 'vehicle',
            component: VehiclesComponent
          },
          {
            path: 'bookings',
            component: BookingsComponent,

            // children: [
            //   {
            //     path: 'success',
            //     component: BookingsComponent
            //   },
            //   {
            //     path: 'cancel',
            //     component: BookingsComponent
            //   }
            // ]
          },
          {
            path: 'view-bookings',
            component: ViewBookingsComponent
          }
        ]
      },
    ]
  },
  {
    path: 'head',
    component: HeaderComponent,
    children: [
      {
        path: 'signin',
        component: SigninComponent
      },
      {
        path: 'main',
        component: HomeComponent
      },
      {
        path: 'booking',
        component: BookingComponent
      }
    ]
  },
  // {
  //   path: 'head',
  //   component: HeaderComponent,
  //   canActivate: [LoginGuard],
  //   children: [
  //     {
  //       path: 'clinics',
  //       component: ClinicsComponent
  //     },
  //     {
  //       path: 'patients',
  //       component: PatientsComponent
  //     }
  //   ]
  // },
  {path: '', pathMatch: "full", redirectTo: '/head/main'},
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {useHash: true})],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
