import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IsAuthenticatedService } from ".././services/is-authenticated.service";
import { AlertService } from ".././services/alert.service";
import { UserService } from ".././services/user.service";

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
                  this.router.navigate(['/']);
              },
              error => {
                  console.log("ERROR:"+error);
                  this.alertService.error("Email ou Password incorretos!");
                  this.loading = false;
              }
          );
  }

  utilizadorOn(){
    /*this.userService.getById(+localStorage.getItem('id')).subscribe(
        resultado => {
              // crio um utilizador deixando apenas o id, email, username e type.
              let userOn = resultado;
              delete userOn.team;
              userOn.type = userOn.type.id;
              localStorage.setItem('userOn',JSON.stringify(userOn));
      },
      error => {
              console.log(error);
      });*/
  }

}
