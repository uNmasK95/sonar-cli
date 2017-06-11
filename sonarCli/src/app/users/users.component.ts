import { Component, OnInit } from '@angular/core';
import { User } from "app/models/user";
import { Router } from "@angular/router";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [new User("motarafa@hotmail.com","Admin"),new User("jaquim@hotmail.com","Normal"),new User("motara@hotmail.com","Admin")]
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  sensorDetails(user: User){
   /* if(zone.type=="Exterior"){
      this.router.navigate(['/zones/external',zone.id]);
    }else if(zone.type=="Interior"){
      this.router.navigate(['/zones/internal',zone.id]);
    }*/console.log("oalsd ")
  }

}
