import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Router} from "@angular/router";
import {LoginService} from "./service/login.service";
import {HttpClient} from "@angular/common/http";
import {CommonService} from "./service/common.service";

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    // public appPages = [
        // {
        //     title: 'Home',
        //     url: '/home',
        //     icon: 'home'
        // },
        // {
        //     title: 'Trips',
        //     url: '/list',
        //     icon: 'list'
        // },
        // {
        //     title: 'Logout',
        //     url: '/home',
        //     icon: ''
        // },
        // {
        //     title: 'Routes',
        //     url: '/booking',
        //     icon: 'list'
        // }
    // ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private loginService: LoginService,
        private commonService: CommonService,
        private router: Router
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    accLogout() {
        if (this.commonService.isLoggedIn()) {
            this.loginService.accLogout().subscribe((result) => {
                    localStorage.clear();
                    this.commonService.setLoginOrLogout(false);
                    this.router.navigate(['/auth'])
                }
            )
        }
    }
}
