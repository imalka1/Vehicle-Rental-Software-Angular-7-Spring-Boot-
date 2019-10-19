import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../service/login.service";
import {CommonService} from "../../service/common.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-side-navbar',
    templateUrl: './side-navbar.component.html',
    styleUrls: ['./side-navbar.component.scss'],
})
export class SideNavbarComponent implements OnInit {

    constructor(
        private loginService: LoginService,
        private commonService: CommonService,
        private router: Router
    ) {
    }

    ngOnInit() {
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
