import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from './http-util.service';
import { Router } from '@angular/router';
import { URLSearchParams,Http, Headers, Response, RequestOptions } from '@angular/http';
import { Sensor } from "app/models/sensor";

@Injectable()
export class SensorValuesService {

    //sensorId -> Zona
    valuesZonaSensores: Map<number,number>;
    //sensorId -> Timestamp
    valuesSensoresTimestamp : Map<number,Array<number>>;
    //sensorId -> Leituras
    valuesSensores : Map<number,Observable<Array<number>>>;
    
    constructor(private router: Router, private http: Http, private httpUtil: HttpUtilService){
        this.valuesZonaSensores = new Map<number,number>();
        this.valuesSensores = new Map<number,Observable<Array<number>>>();
        this.valuesSensoresTimestamp = new Map<number,Array<number>>();
	}

    //Vai estar sempre a fazer pedidos ao servidor dos sensores.
    ngOnInit(){
    }
    
    getSensor(sensordId: number){
        return this.valuesSensores.get(sensordId);
    }
    getTimeStamp(sensorId:number){
        return this.valuesSensoresTimestamp.get(sensorId);
    }

    // elimina todos pois o utilizador vai fazer logout
    deleteAllValues(){
        this.valuesSensores.clear();
        this.valuesSensoresTimestamp.clear();
        this.valuesZonaSensores.clear();
    }

    // vamos avisar que vamos utilizar estes values para ele atualizar caso nao tenha
    lervalues( zone:[number], sensorId:[number],timestamp: number){
        let i = 0;
        for(let id of sensorId){
            if(!this.valuesSensores.get(id)){
                this.valuesZonaSensores.set(id,zone[i]);
                this.saveResultFirstTime(id,zone[i],timestamp);
            }
            else{
                // colocar a data de hoje menos o timestamp(hora) que o utilizador quer ver
                let timenow = new Date();
                let t = timenow.getTime()-1000 * 3600 * timestamp;
                // se o primeiro valor for maior que o timestamp pedido quer dizer que nao temos informação desse time, logo vamos buscar tudo
                if(this.valuesSensoresTimestamp.get(id)[0]>t){
                    //aqui vamos buscar todos os values dando um timestamp
                    this.saveResultFirstTime(id,zone[i],timestamp);
                }
            }
            i++;
        }
    }

    saveResultFirstTime(id,zona,timestamp){
        this.getSensorIdValues(zona,id,timestamp).subscribe(
            resultado =>{
                this.valuesSensores.set(id,new Observable(observer =>{
                    //colocamos todas as leituras feitas apartir do timestamp
                    for(let value of resultado){
                        this.valuesSensoresTimestamp.get(id).push(value.timestamp); 
                        observer.next(value.value);
                    }
                    //aqui vamos de x em x segundos ver se o sensor ja tem mais leituras se tiver guardamos no valor senão continuamos a fazer o mesmo
                    setInterval(() => { 
                        this.getSensorIdValues(zona,id,timestamp).subscribe(
                            resultado =>{
                                for(let value of resultado){
                                    this.valuesSensoresTimestamp.get(id).push(value.timestamp); 
                                    observer.next(value.value);
                                } 
                            },
                            error =>{
                                console.log(error);
                            }
                        );
                    }, 5000);  
                }));
            },
            error =>{
                console.log(error);
            }
        )
    }


    // vai buscar todos os values de um sensor, atraves do tempo dado.
    getSensorIdValues(sensorid:number,zoneid:number,timestamp:number){
        let headersParams = { 'Content-Type': 'application/json' };
        if (localStorage['currentUser']) {
            headersParams['Authorization'] = localStorage['currentUser'];
        }
        var search = new URLSearchParams();
        search.set('zone', ''+zoneid);
        search.set('sensor', ''+sensorid);
        search.set('window',''+timestamp);
        let headers = new Headers(headersParams);
        let options = new RequestOptions({ headers: headers, search:search});
        return this.http.get(this.httpUtil.url("/reads"),options)
                   .map(this.httpUtil.extrairDados);
    }

    // vai buscar todos os values de um sensor
    getSensorIdValues2(sensorid:number,zoneid:number, timestampInitial, timestampFinal){
        let headersParams = { 'Content-Type': 'application/json' };
        if (localStorage['currentUser']) {
            headersParams['Authorization'] = localStorage['currentUser'];
        }
        var search = new URLSearchParams();
        search.set('zone', ''+zoneid);
        search.set('sensor', ''+sensorid);
        search.set('frist', ''+timestampInitial);
        search.set('last', ''+timestampFinal);
        let headers = new Headers(headersParams);
        let options = new RequestOptions({ headers: headers, search:search});
        return this.http.get(this.httpUtil.url("/reads"),options)
                   .map(this.httpUtil.extrairDados);
    }

}
