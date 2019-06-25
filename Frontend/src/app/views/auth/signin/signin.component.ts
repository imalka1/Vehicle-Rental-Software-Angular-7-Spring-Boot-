import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";
import {User} from "../../../model/user";
import {Token} from "../../../model/token";
import {CommonService} from "../../../services/common.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User = new User();

  constructor(private router: Router, private loginService: LoginService,private commonService: CommonService) {
  }

  ngOnInit() {
  }

  accLogin() {
    this.user.userRole = 'admin';
    this.loginService.accLogin(this.user).subscribe((result) => {
      let token: Token = result;
      if (token.token != 'errorLogin') {
        localStorage.setItem('token', 'Token ' + token.token);
        this.router.navigate(['/head/main']);
        this.commonService.setLoginOrLogout(true);
      }
    });
  }
}
