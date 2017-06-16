import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IsAuthenticatedService } from "../../services/is-authenticated.service";
import { AlertService } from "../../services/alert.service";
import { UserService } from "../../services/user.service";
import { User } from "app/models/user";
import { SensorValuesService } from "../../services/sensorvalues.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
     private route: ActivatedRoute,
     private router: Router,
     private isauthenticationService: IsAuthenticatedService,
     private alertService: AlertService,
     private userService: UserService) { }


  ngOnInit() {
  }

  login() {
    this.loading = true;
    //APAGAR
    //this.router.navigate(['/']);
    this.isauthenticationService.login(this.model.email, this.model.password)
        .subscribe(
              resultado => {
                  this.utilizadorOn();
                  this.router.navigate(['/dashboard']);
              },
              error => {
                  console.log("ERROR:"+error);
                  this.alertService.error("Email ou Password incorretos!");
                  this.loading = false;
              }
          );
  }

  utilizadorOn(){
      console.log(localStorage.getItem('id'));
    this.userService.getUser(localStorage.getItem('id')).subscribe(
        resultado => {
              // crio um utilizador deixando apenas o id, email, username e type.
              let user = resultado;
              user.id = user._id.$oid;
              delete user.password_digest;
              localStorage.setItem('userOn',JSON.stringify(user));
      },
      error => {
              console.log(error);
      });
  }

}
