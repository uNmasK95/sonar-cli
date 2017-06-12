import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '.././models/user';
import { HttpUtilService } from "./http-util.service";
import { Router } from "@angular/router";
import { Http, Headers, Response } from "@angular/http";

@Injectable()
export class UserService {

  constructor(private router: Router, private http: Http, private httpUtil: HttpUtilService) { }


  registerUser(email: string, password:string){
    return this.http.post(this.httpUtil.url('/users'), JSON.stringify({email: email, password: password}), this.httpUtil.headers())
               .map(
                 (response : Response) => {
                   console.log("registado utilizador: "+ email);
                 }
               )
  }

  getUtilizador(id: number){
    return this.http.get(this.httpUtil.url('/users/'+id),this.httpUtil.headers()).map(this.httpUtil.extrairDados);
  }

  getTodosUtilizadores(){
    return this.http.get(this.httpUtil.url('/users'),this.httpUtil.headers()).map(this.httpUtil.extrairDados);
  }

  removeUtilizador(id:number){
    return this.http.delete(this.httpUtil.url('/users'),this.httpUtil.headers());
  }


}
