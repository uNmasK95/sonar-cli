import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { HttpUtilService } from "app/services/http-util.service";

@Injectable()
export class ZonesService {

  constructor(private http: Http, private httpUtil: HttpUtilService) { }

  //Get all zones
  getAll() {
    return this.http.get(this.httpUtil.url('/zones'), this.httpUtil.headers())
               .map(this.httpUtil.extrairDados);
  }

  //Get a zone
  get(zoneId) {
    return this.http.get(this.httpUtil.url('/zones/'+zoneId), this.httpUtil.headers())
               .map(this.httpUtil.extrairDados);
  }

  //Create a new zone
  create(name,desc,type,min,max){
    return this.http.post(this.httpUtil.url('/zones'), JSON.stringify({name: name, description: desc,
          type: type, min: min, max: max}), this.httpUtil.headers())
              .map(this.httpUtil.extrairDados);
  }

}
