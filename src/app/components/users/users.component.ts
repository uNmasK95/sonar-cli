import { Component, OnInit } from '@angular/core';
import { User } from "app/models/user";
import { Router } from "@angular/router";
import { UserService } from "app/services/user.service";
import { AlertService } from "app/services/alert.service";
import { FilterPipe } from "app/services/FilterPipe";

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = []
  model : any = {}
  
  constructor(private router: Router,private alertService: AlertService,private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(
      resultado => {
        for(let user of resultado){
          if(user._id.$oid != localStorage.getItem('id')){
            let useraux = new User(user._id.$oid,user.email,user.user_type)
            this.users.push(useraux)
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  removeUser(user : User, id : number){
    this.userService.removeUser(user.id).subscribe(
      resultado =>{
        this.users.splice(id,1);
        this.alertService.success("User "+user.email+" deleted");
      },
      error =>{
        console.log(error);
      }
    )
  }

  //Return type of user
  type(value: number): string{
      if(value==0) return "Admin";
      return "Normal User";
  }

}
