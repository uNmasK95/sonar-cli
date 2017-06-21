import { Component, OnInit } from '@angular/core';
import { AlertService } from "app/services/alert.service";
import { UserService } from "app/services/user.service";

@Component({
  selector: 'users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {
  model : any = {};
  loading = false;

  constructor(private alertService: AlertService, private userService: UserService) { }

  ngOnInit() {
  }

  registerUser(){
    this.loading = true;
    if(this.model.email && this.model.password){
      if(this.validateEmail()){
        //ver a cena de admins, mas tem a informação que falta no this.model.admin = true||fase
        console.log("vou aqui")
        if(this.model.admin){
          /*
          this.userService.registerUser(this.model.email,this.model.password,0).subscribe(
            resultado => {
              console.log(resultado);
              this.loading = false;
              this.alertService.success("User "+this.model.email+" add to the system");
            },
            error => {
              this.loading = false;
              this.alertService.error("Email in Use");
            }
          )
          */
        }
        else{
          /*this.userService.registerUser(this.model.email,this.model.password,1).subscribe(
            resultado => {
              console.log(resultado);
              this.loading = false;
              this.alertService.success("User "+this.model.email+" add to the system");
            },
            error => {
              this.loading = false;
              this.alertService.error("Email in Use");
            }
          )*/
        }
      }else{
        this.alertService.error("Email not valid")
      }
      this.loading = false;
    }
    else{
      this.loading = false;
    }
  }
    validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.model.email);
    }

}
