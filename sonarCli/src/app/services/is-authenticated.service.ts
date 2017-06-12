import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '.././models/user';
import { HttpUtilService } from './http-util.service';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class IsAuthenticatedService {

  //userLoggedIn : boolean = false;
  userLogged : User; //User logado

  constructor(private router: Router, private http: Http, private httpUtil: HttpUtilService){
	}

  //call this function when login status changes
  changeLoginStatus(status: boolean){
      //this.userLoggedIn = status;
      console.log("in changeLoginStatus: ", status);
  }

  getLoginStatus(){
    //return this.userLoggedIn;
    return localStorage['currentUser'];
  }

  //LOGIN retorna um token  
  login(email: string, pass: string){
    return this.http.post((this.httpUtil.url('/login')), JSON.stringify({email : email, password : pass}) ,this.httpUtil.headers())
                .map(
                  (response: Response) => {
                      let data = response.json();
                      console.log(data);
                      if(data && data.auth_token){
                        console.log("login");
                        localStorage.setItem('currentUser',data.auth_token);
                        localStorage.setItem('id',data.user_id.$oid);
                      }
                  }
                )
  }

  logout(){
    //this.changeLoginStatus(false);
    this.userLogged = null;
    localStorage.removeItem('currentUser');
  }

  // ver se é preciso colocar admin false;
  register(username: string,email: string, password:string){
    return this.http.post(this.httpUtil.url('/users'), JSON.stringify({email: email, password: password}), this.httpUtil.headers())
               .map(
                 (response : Response) => {
                   console.log("registado utilizador: "+ email);
                 }
               )
  }

  //
  canActivate() {
  		if (this.getLoginStatus()) {
  			return true;
  		}
  		this.router.navigate(['']);
  	}
}
