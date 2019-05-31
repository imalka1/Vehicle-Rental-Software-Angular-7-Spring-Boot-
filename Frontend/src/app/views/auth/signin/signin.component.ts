import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";
import {User} from "../../../model/user";
import {Token} from "../../../model/token";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User = new User();

  constructor(private router: Router, private loginService: LoginService) {
  }

  ngOnInit() {
  }

  accLogin() {
    this.user.role = 'admin';
    this.loginService.accLogin(this.user).subscribe((result) => {
      let token: Token = result;
      if (token.token != 'errorLogin') {
        localStorage.setItem('token', 'Token ' + token.token);
        this.router.navigate(['/head/main']);
        this.loginService.setLoginOrLogout(true);
      }
    });
  }
}
