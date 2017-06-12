import { Component } from '@angular/core';
import { IsAuthenticatedService } from "./services/is-authenticated.service";
import { Router } from "@angular/router";
import { LoginGuardService } from "app/services/login-guard.service";
import { Notification } from "app/models/notification";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app workssadas!';
  
  notNotReaded: Notification[] = [new Notification(1,"Sensor 1","Zone1","Sensor fora 40db",new Date()),
                          new Notification(2,"Sensor 2","Zone2","Sensor fora 40db",new Date()),
                          new Notification(3,"Sensor 3","Zone3","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date()),
                          new Notification(4,"Sensor 4","Zone4","Sensor fora 40db",new Date())
                          ];

  constructor(
    private isAuthenticatedService: IsAuthenticatedService,
    private router: Router,
    private loginGuardService: LoginGuardService)
    //private userService: UserService) 
    { 
  }

  isLogged(){
    return this.isAuthenticatedService.getLoginStatus();
  }
  
  logout(){
    this.isAuthenticatedService.logout();
    delete localStorage['token'];
    delete localStorage['userOn'];
    location.reload();
  }

}
