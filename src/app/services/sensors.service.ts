import { Injectable } from '@angular/core';
import { URLSearchParams,Http, Headers, Response, RequestOptions } from "@angular/http";
import { HttpUtilService } from "app/services/http-util.service";

@Injectable()
export class SensorsService {

  constructor(private http: Http, 
              private httpUtil: HttpUtilService) { }


  //Get a sensor
  getSensor(zone, sensorId){
    return this.http.get(this.httpUtil.url('/zones/'+zone+'/sensors/'+sensorId), this.httpUtil.headers())
               .map(this.httpUtil.extrairDados);
  }

  //Get all sensor of a zone
  get(zone_id) {
    return this.http.get(this.httpUtil.url('/zones/'+zone_id+'/sensors'), this.httpUtil.headers())
               .map(this.httpUtil.extrairDados);
  }

  //Create a new sensor
  create(zone, name, hostname, description, min, max, lat, long){
    return this.http.post(this.httpUtil.url('/zones/'+zone+'/sensors'),
                JSON.stringify({hostname: hostname, name: name, description: description, min: min, max: max, 
                  latitude: lat, longitude: long }),this.httpUtil.headers())
               .map(this.httpUtil.extrairDados);
  }

  //Update a sensor
  update(zone, sensor, name, hostname, description, min, max, lat, long){
    return this.http.put(this.httpUtil.url('/zones/'+zone+'/sensors/'+sensor),
                JSON.stringify({hostname: hostname, name: name, description: description, min: min, max: max, 
                  latitude: lat, longitude: long }),this.httpUtil.headers())
               .map(this.httpUtil.extrairDados);
  }
    getSensorIdValues(zoneid:string,sensorid:string,window:number){
      let headersParams = { 'Content-Type': 'application/json' };
      if (localStorage['currentUser']) {
          headersParams['Authorization'] = localStorage['currentUser'];
      }
      var search = new URLSearchParams();
      search.set('zone', ''+zoneid);
      search.set('sensor', ''+sensorid);
      search.set('window',''+window);
      let headers = new Headers(headersParams);
      let options = new RequestOptions({ headers: headers, search:search});
      return this.http.get(this.httpUtil.url("/reads"),options)
                  .map(this.httpUtil.extrairDados);
  }

    getSensorLastValues(zoneid: string, sensorid: string, timestamp: number)  {
      let headersParams = { 'Content-Type': 'application/json' };
      if (localStorage['currentUser']) {
          headersParams['Authorization'] = localStorage['currentUser'];
      }
      var search = new URLSearchParams();
      search.set('zone', '' + zoneid);
      search.set('sensor', '' + sensorid);
      search.set('timestamp', '' + timestamp);
      let headers = new Headers(headersParams);
      let options = new RequestOptions({ headers: headers, search:search});
      return this.http.get(this.httpUtil.url("/reads"),options)
                  .map(this.httpUtil.extrairDados);
  }

  //Get State of sensor
  getState(zoneId, sensorId){
    return this.http.get(this.httpUtil.url('/zones/'+zoneId+'/sensors/'+sensorId+'/state'), this.httpUtil.headers())
               .map(this.httpUtil.extrairDados)
               .catch(this.httpUtil.processarErros);
  }

  //TurnOn sensor
  turnOn(zoneId, sensorId){
    return this.http.post(this.httpUtil.url('/zones/'+zoneId+'/sensors/'+sensorId+'/turnOn'),
                JSON.stringify({}),this.httpUtil.headers())
               .map(this.httpUtil.extrairDados);
  }

  //TurnOff sensor
  turnOff(zoneId, sensorId){
    return this.http.post(this.httpUtil.url('/zones/'+zoneId+'/sensors/'+sensorId+'/turnOff'),
                JSON.stringify({}),this.httpUtil.headers())
               .map(this.httpUtil.extrairDados);
  }
}
