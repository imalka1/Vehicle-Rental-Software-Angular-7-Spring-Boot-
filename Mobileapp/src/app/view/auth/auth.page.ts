import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../service/login.service";
import {CommonService} from "../../service/common.service";
import {Token} from "../../dtos/token";
import {User} from "../../model/user";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.page.html',
    styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

    user: User = new User();

    constructor(private router: Router, private loginService: LoginService, private commonService: CommonService) {
    }

    accLogin() {
        this.user.userRole = 'driver';
        this.loginService.accLogin(this.user).subscribe((result) => {
            let token: Token = result;
            if (token.token != 'errorLogin') {
                localStorage.setItem('token', 'Token ' + token.token);
                localStorage.setItem('user', token.userId);
                this.router.navigate(['/home']);
                this.commonService.setLoginOrLogout(true);
            }
        });
    }

    ngOnInit() {
    }

}
