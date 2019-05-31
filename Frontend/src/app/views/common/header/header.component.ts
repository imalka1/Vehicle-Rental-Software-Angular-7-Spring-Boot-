import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";

declare var custom_navigation: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loginButtonText: String = '';

  constructor(private router: Router, private loginService: LoginService) {
    loginService.login.subscribe((value) => {
      this.setLoginText(value)
    })
  }

  ngOnInit() {
    custom_navigation();
    if (this.loginService.isLoggedIn()) {
      this.setLoginText(true)
    } else {
      this.setLoginText(false)
    }
  }

  setLoginText(logged) {
    if (logged) {
      this.loginButtonText = 'Sign out'
    } else {
      this.loginButtonText = 'Admin'
    }
  }

  loginOrLogout() {
    if (this.loginService.isLoggedIn()) {
      this.loginService.accLogout().subscribe((result) => {
          localStorage.clear();
          this.loginService.setLoginOrLogout(false);
          this.router.navigate(['/head/main'])
        }
      )
    } else {
      this.router.navigate(['/head/signin'])
    }
  }

  isHomeActive() {
    if (this.router.url == '/head/main') {
      return "active";
    } else {
      return "";
    }
  }

  isLoginActive() {
    if (this.router.url == '/head/signin') {
      return false;
    } else {
      return true;
    }
  }

  isAdminPanel() {
    if (this.loginService.isLoggedIn()) {
      return true;
    } else {
      return false;
    }
  }

}
