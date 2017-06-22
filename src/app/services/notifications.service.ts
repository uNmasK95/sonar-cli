import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response, URLSearchParams } from "@angular/http";
import { HttpUtilService } from "app/services/http-util.service";
import { Notification } from "app/models/notification";

@Injectable()
export class NotificationsService {

  constructor(private http: Http, private httpUtil: HttpUtilService) {
    //pedido iniciais
  }

  
//Get das notificacoes todas
  getAll(){
    return this.http.get(this.httpUtil.url('/notifications'), this.httpUtil.headers())
               .map(this.httpUtil.extrairDados);
  }

  //Get das notificacoes nao lidas do user logado
  getNotificationsNotRead(){
    //console.log(localStorage['id']);
    let headersParams = { 'Content-Type': 'application/json' };
    if (localStorage['currentUser']) {
        headersParams['Authorization'] = localStorage['currentUser'];
    }
    var search = new URLSearchParams();
    search.set('user', ''+localStorage['id']);
    let headers = new Headers(headersParams);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.get(this.httpUtil.url("/notifications"),options)
                .map(this.httpUtil.extrairDados);
  }

  seeAll(){
    return this.http.post(this.httpUtil.url('/notifications/seeall?user='+localStorage['id']),'',
          this.httpUtil.headers())
              .map(this.httpUtil.extrairDados);
  }

  //Marcar notificacao como lida pelo user locado
  wasRead(not: Notification){
    console.log(not.id);
    //console.log(localStorage['id']);
      return this.http.put(this.httpUtil.url('/notifications/'+not.id+"?user="+localStorage['id']),'',
            this.httpUtil.headers())
                .map(this.httpUtil.extrairDados);

    /*let headersParams = { 'Content-Type': 'application/json' };
    if (localStorage['currentUser']) {
        headersParams['Authorization'] = localStorage['currentUser'];
    }
    var search = new URLSearchParams();
    search.set('user', ''+localStorage['id']);
    let headers = new Headers(headersParams);
    let options = new RequestOptions({ headers: headers, search: search});
    return this.http.put(this.httpUtil.url("/notifications/"+not.id),options)
                .map(this.httpUtil.extrairDados);*/
  }
}
