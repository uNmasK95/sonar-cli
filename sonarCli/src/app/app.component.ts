import { Component } from '@angular/core';
import { IsAuthenticatedService } from "app/services/is-authenticated.service";
import { Router } from "@angular/router";
import { LoginGuardService } from "app/services/login-guard.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app workssadas!';

  constructor(
    private isAuthenticatedService: IsAuthenticatedService,
    private router: Router,
    private loginGuardService: LoginGuardService)
    //private userService: UserService) 
    { 
  }

  isLogged(){
    //return this.isAuthenticatedService.getLoginStatus();
    return true;
  }
  
  logout(){
    this.isAuthenticatedService.logout();
    delete localStorage['token'];
    delete localStorage['userOn'];
    location.reload();
  }

}
