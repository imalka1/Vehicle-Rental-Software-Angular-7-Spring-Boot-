import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {PlacesComponent} from "../../../Frontend/src/app/views/admin-panel/places/places.component";
import {HomePageModule} from "./view/home/home.module";
import {AuthPageModule} from "./view/auth/auth.module";
import {HomePage} from "./view/home/home.page";
import {AuthPage} from "./view/auth/auth.page";
import {HeaderComponent} from "./view/header/header.component";
import {LoginGuard} from "../../../Frontend/src/app/guards/login.guard";
import {LoginGuardService} from "./service/login-guard.service";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'full'
    },
    // {
    //     path: 'home',
    //     component: HomePage
    // },
    // {
    //     path: 'auth',
    //     component: AuthPage
    // },
    {
        path: 'auth',
        loadChildren: './view/auth/auth.module#AuthPageModule'
    },
    {
        path: 'admin',
        component:HeaderComponent,
        canActivate: [LoginGuardService],
        children:[
            {
                path: 'home',
                loadChildren: () => import('./view/home/home.module').then(m => m.HomePageModule)
            },
            {
                path: 'list',
                loadChildren: () => import('./view/list/list.module').then(m => m.ListPageModule)
            },
            {
                path: 'booking',
                loadChildren: './view/booking/booking.module#BookingPageModule'
            }
        ]
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
