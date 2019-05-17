import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginService} from "../../../services/login.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private router: Router,private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
    localStorage.setItem('login', 'true');
    this.router.navigate(['/head/main']);
    this.loginService.setLoginOrLogout(true)
  }
}
