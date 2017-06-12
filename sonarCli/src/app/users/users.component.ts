import { Component, OnInit } from '@angular/core';
import { User } from "app/models/user";
import { Router } from "@angular/router";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [new User("1","motarafa@hotmail.com",true),new User("2","jaquim@hotmail.com",true),new User("3","motara@hotmail.com",true)]
  
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
