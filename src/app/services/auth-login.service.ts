import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/Rx';
import { HttpUtilService } from './http-util.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthLoginService {

  constructor(private http: Http, private httpUtil: HttpUtilService, private router: Router) { }

  // Depois do utilizador estar logado não pode ir para o login nem register
  canActivate(){
    if(!localStorage['currentUser']){
      return true;
    }
    this.router.navigate(['/dashboard']);
  }

}
