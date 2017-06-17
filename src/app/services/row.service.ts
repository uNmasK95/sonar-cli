import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from './http-util.service';
import { Router } from '@angular/router';
import { URLSearchParams,Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class RowService {

    constructor(private http: Http, 
              private httpUtil: HttpUtilService) { }

    getRows(userId: string){
        let headersParams = { 'Content-Type': 'application/json' };
        if (localStorage['currentUser']) {
                   console.log(localStorage['currentUser']);
            headersParams['Authorization'] = localStorage['currentUser'];
        }
        var search = new URLSearchParams();
        search.set('user', userId);
        let headers = new Headers(headersParams);
        let options = new RequestOptions({ headers: headers, search:search});
        return this.http.get(this.httpUtil.url("/lines"),options)
                   .map(this.httpUtil.extrairDados);

    }
    createRow(userId: string, nameRow: string){
        let headersParams = { 'Content-Type': 'application/json' };
        if (localStorage['currentUser']) {
            headersParams['Authorization'] = localStorage['currentUser'];
        }
        var search = new URLSearchParams();
        search.set('user', userId);
        search.set('name', nameRow);
        let headers = new Headers(headersParams);
        let options = new RequestOptions({ headers: headers, search:search});
        console.log(options)
        console.log("Criada");
        return this.http.post(this.httpUtil.url("/lines/"),options)
                   .map(this.httpUtil.extrairDados);
    }

    deleteRow(userId: string,lineId: number){
        let headersParams = { 'Content-Type': 'application/json' };
        if (localStorage['currentUser']) {
            headersParams['Authorization'] = localStorage['currentUser'];
        }
        var search = new URLSearchParams();
        search.set('user', userId);
        let headers = new Headers(headersParams);
        let options = new RequestOptions({ headers: headers, search:search});
        console.log(options)
        console.log("eliminada")
       return this.http.delete(this.httpUtil.url("/lines/"+lineId),options)
                   .map(this.httpUtil.extrairDados);
    }
}