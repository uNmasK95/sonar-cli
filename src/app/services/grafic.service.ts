import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from './http-util.service';
import { Router } from '@angular/router';
import { URLSearchParams,Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class GraficService {

    constructor(private http: Http, 
              private httpUtil: HttpUtilService) { }

    getGrafic(userId: string, line_id: string, grafico_id: string){
        let headersParams = { 'Content-Type': 'application/json' };
        if (localStorage['currentUser']) {
            headersParams['Authorization'] = localStorage['currentUser'];
        }
        var search = new URLSearchParams();
        console.log(userId);
        search.set('user', userId);
        let headers = new Headers(headersParams);
        let options = new RequestOptions({ headers: headers, search:search});
        return this.http.get(this.httpUtil.url("/lines/"+line_id+"/graphics/"+grafico_id),options)
                   .map(this.httpUtil.extrairDados);

    }

    createGrafic(userId: string,line_id:string, name: string, rangeTime: number){
        let headersParams = { 'Content-Type': 'application/json' };
        if (localStorage['currentUser']) {
            headersParams['Authorization'] = localStorage['currentUser'];
        }
        var search = new URLSearchParams();
        console.log(userId);
        search.set('user', userId);
        let headers = new Headers(headersParams);
        let options = new RequestOptions({ headers: headers, search:search});
        return this.http.post(this.httpUtil.url("/lines/"+line_id+"/graphics"),JSON.stringify({name:name,rangeTime:rangeTime}),options).map(this.httpUtil.extrairDados);
    }

    removeGraphic(userId: string, line_id: string, grafico_id: string){
        let headersParams = { 'Content-Type': 'application/json' };
        if (localStorage['currentUser']) {
            headersParams['Authorization'] = localStorage['currentUser'];
        }
        var search = new URLSearchParams();
        search.set('user', userId);
        let headers = new Headers(headersParams);
        let options = new RequestOptions({ headers: headers, search:search});
        return this.http.delete(this.httpUtil.url("/lines/"+line_id+"/graphics/"+grafico_id),options)
                   .map(this.httpUtil.extrairDados);
    }
}