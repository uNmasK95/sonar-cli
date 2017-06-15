import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AlertService } from "app/services/alert.service";
import { IsAuthenticatedService } from "app/services/is-authenticated.service";
import { UserService } from "app/services/user.service";

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  model :any = {};
  userLogged: any = {};
  editSelected: boolean = false;

  constructor(private userService: UserService,private alertService: AlertService, private isAuthenticatedService: IsAuthenticatedService) { }

  ngOnInit() {
    this.userLogged = JSON.parse(localStorage.getItem('userOn'));
    this.model = JSON.parse(localStorage.getItem('userOn'));
  }

  edit(){
    this.editSelected = true;
    if(this.model.password && this.model.newpassword == this.model.newconfpassword){

      this.userService.userconfirm(this.model.email,this.model.password).subscribe(
        resultado => {
          //Colocamos o novo token
          localStorage.setItem('currentUser',resultado.auth_token);
          localStorage.setItem('id',resultado.user_id.$oid);

          this.userService.update(this.userLogged.id,this.model.email,this.model.newpassword).subscribe(
            resultado => {
              this.alertService.success("Data change with success!!");
              this.logout();
            },
            error => {
              this.editSelected = false;
              console.log(error);
            })
        },
        error => {
          this.editSelected = false
          this.alertService.error("Wrong Password!");
        }
      )
      
    }
    else{
      if(this.model.password && this.model.newpassword && this.model.newconfpassword){
        this.alertService.error("New Password and Confirm New Passwrod not sames!");
      }
    }
  }

  logout(){
    this.isAuthenticatedService.logout();
    delete localStorage['token'];
    delete localStorage['userOn'];
    location.reload();
  }

}
