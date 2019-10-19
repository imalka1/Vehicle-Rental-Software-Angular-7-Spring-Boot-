import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginGuardService} from "./service/login-guard.service";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: './view/auth/auth.module#AuthPageModule'
    },
    {
        path: 'home',
        loadChildren: () => import('./view/home/home.module').then(m => m.HomePageModule),
        canActivate: [LoginGuardService]
        // component: HomeComponent
    },
    {
        path: 'list',
        loadChildren: () => import('./view/list/list.module').then(m => m.ListPageModule),
        canActivate: [LoginGuardService]
        // component: ListComponent
    },
    {
        path: 'booking',
        loadChildren: './view/booking/booking.module#BookingPageModule',
        canActivate: [LoginGuardService]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
