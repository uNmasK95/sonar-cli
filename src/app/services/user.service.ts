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
    return this.http.post(this.httpUtil.url('/admin/users'), JSON.stringify({email: email, password: password}), this.httpUtil.headers())
               .map(
                 (response : Response) => {
                   console.log("registado utilizador: "+ email);
                 }
               )
  }

  getUser(id: string){
    return this.http.get(this.httpUtil.url('/admin/users/'+id),this.httpUtil.headers()).map(this.httpUtil.extrairDados);
  }

  getAllUsers(){
    return this.http.get(this.httpUtil.url('/admin/users'),this.httpUtil.headers()).map(this.httpUtil.extrairDados);
  }

  removeUser(id:string){
    return this.http.delete(this.httpUtil.url('/admin/users/'+id),this.httpUtil.headers()).map(this.httpUtil.extrairDados);
  }

  userconfirm(email: string, password: string){
        return this.http.post((this.httpUtil.url('/login')), JSON.stringify({email : email, password : password}) ,this.httpUtil.headers())
                .map(this.httpUtil.extrairDados);
  }

  update(id: string,email: string, password: string){
        return this.http.put(this.httpUtil.url('/admin/users/' + id),JSON.stringify({email: email, password: password}),this.httpUtil.headers())
                   .map(this.httpUtil.extrairDados);
  }
  


}
