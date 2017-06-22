import { Component, OnInit } from '@angular/core';
import { AlertService } from "app/services/alert.service";
import { UserService } from "app/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {
  model : any = {};
  loading = false;

  constructor(private alertService: AlertService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.model.type = "1";
  }

  registerUser(){
    this.loading = true;
    if(this.model.email && this.model.password){
      if(this.validateEmail()){
        this.userService.registerUser(this.model.email,this.model.password,this.model.type).subscribe(
          resultado => {
            this.loading = false;
            if(this.model.type==2){
              this.alertService.success("Sensor "+this.model.email+" add to the system");
            }
            else{
              this.alertService.success("User "+this.model.email+" add to the system");
            }
            this.router.navigate(['/users'])
          },
          error => {
            this.loading = false;
            this.alertService.error("Email in Use");
          }
        )
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
