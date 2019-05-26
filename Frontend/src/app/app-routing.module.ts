import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HeaderComponent} from "./views/common/header/header.component";
import {HomeComponent} from "./views/home/home.component";
import {SigninComponent} from "./views/auth/signin/signin.component";
import {BookingComponent} from "./views/booking/booking.component";
import {AdminPanelComponent} from "./views/admin-panel/admin-panel.component";
import {LoginGuard} from "./guards/login.guard";

const routes: Routes = [
  {
    path: 'log-head',
    component: HeaderComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'admin',
        component: AdminPanelComponent
      }
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
        path: 'bookings',
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
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
