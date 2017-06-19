import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from './http-util.service';
import { Router } from '@angular/router';
import { URLSearchParams,Http, Headers, Response, RequestOptions } from '@angular/http';

@Injectable()
export class MetricService {

    constructor(private http: Http, 
              private httpUtil: HttpUtilService) { }

    addMetric(userId: string, line_id: string, grafico_id: string, zone_id :string, sensor_id: string){
        let headersParams = { 'Content-Type': 'application/json' };
        if (localStorage['currentUser']) {
            headersParams['Authorization'] = localStorage['currentUser'];
        }
        var search = new URLSearchParams();
        search.set('user', userId);
        let headers = new Headers(headersParams);
        let options = new RequestOptions({ headers: headers, search:search});
        return this.http.post(this.httpUtil.url("/lines/"+line_id+"/graphics/"+grafico_id+"/metrics"),
                    JSON.stringify({name: "",sensor: sensor_id,zone:zone_id}),options)
                   .map(this.httpUtil.extrairDados);

    }

    removeMetric(userId: string, line_id: string, grafico_id: string,metric_id : string){
        let headersParams = { 'Content-Type': 'application/json' };
        if (localStorage['currentUser']) {
            headersParams['Authorization'] = localStorage['currentUser'];
        }
        var search = new URLSearchParams();
        search.set('user', userId);
        let headers = new Headers(headersParams);
        let options = new RequestOptions({ headers: headers, search:search});
        return this.http.delete(this.httpUtil.url("/lines/"+line_id+"/graphics/"+grafico_id+"/metrics/"+metric_id),options).map(this.httpUtil.extrairDados);

    }
}