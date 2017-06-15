import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from './http-util.service';
import { Router } from '@angular/router';
import { URLSearchParams,Http, Headers, Response, RequestOptions } from '@angular/http';
import { Sensor } from "app/models/sensor";

@Injectable()
export class SensorValuesService {

    getValues : boolean = true;
    //sensorId -> Zona
    valuesZonaSensores: Map<number,number>;
    valuesSensoresLastTimestamp : Map<number,number>;
    valuesSensores : Map<number,Observable<Array<number>>>;
    
    constructor(private router: Router, private http: Http, private httpUtil: HttpUtilService){
        this.valuesZonaSensores = new Map<number,number>();
        this.valuesSensores = new Map<number,Observable<Array<number>>>();
        this.valuesSensoresLastTimestamp = new Map<number,number>();
	}

    //Vai estar sempre a fazer pedidos ao servidor dos sensores.
    ngOnInit(){
        while(this.getValues){
            setTimeout(() => {
                this.valuesSensores.forEach((value: Observable<Array<number>>, key: number) => {
                    let zona = this.valuesZonaSensores.get(key);
                    let time = this.valuesSensoresLastTimestamp.get(key);
                    this.getSensorIdValues(key,zona,time).subscribe(
                        resultado =>{
                            let length = resultado.length;
                            let aux = 1;
                            for(let value of resultado){
                                if(aux == length){
                                    this.valuesSensoresLastTimestamp.set(key,value.timestamp);
                                }
                                this.valuesSensores.get(key).next(value.value);
                            }
                        },
                        error =>{
                            console.log(error);
                        }
                    )
                });
            }, 5000);
        }
    }
    
    getSensor(sensordId: number,timestamp : number){
        let p = this.valuesSensores.get(sensordId)
        return this.valuesSensores.get(sensordId);
    }

    //quando o utilizador faz login
    searchvalues(){
        this.getValues = true;
    }

    // elimina todos pois o utilizador vai fazer logout
    deleteAllValues(){
        this.getValues = false;
        this.valuesSensores.clear();
    }

    // vamos avisar que vamos utilizar estes values para ele atualizar caso nao tenha
    lervalues( zone:[number], sensorId:[number],timestamp: number){
        let i = 0;
        for(let id of sensorId){
            if(!this.valuesSensores.get(id)){
                this.valuesZonaSensores.set(id,zone[i]);
                this.getSensorIdValues(zone[i],id,timestamp).subscribe(
                        resultado =>{
                            this.valuesSensores.set(id,new Observable(observer =>{
                                for(let value of resultado){
                                    
                                }
                                setInterval( 
                                    () => {
                                        this.getSensorIdValues(zone[i],id,timestamp).subscribe(
                                           resultado =>{
                                              observer.next();
                                           }
                                        )
                                    },5000
                                )
                            }))
                            let length = resultado.length;
                            let aux = 1;
                            for(let value of resultado){
                                if(aux == length){
                                    this.valuesSensoresLastTimestamp.set(id,value.timestamp);
                                }
                                this.valuesSensores.get(id).set(value.timestamp,value.value);
                            }
                        },
                        error =>{
                            console.log(error);
                        }
                    ) 
            }
            else{
                // colocar a data de hoje menos o timestamp(hora) que o utilizador quer ver
                let timenow = new Date();
                let t = timenow.getTime()-1000 * 3600 * timestamp;
                // se tem o valor do timestamp tudo bem entao, senão temos de ir buscar os values que faltam
                if(!this.valuesSensores.get(id).get(timestamp)){
                    //aqui vamos buscar todos os values dando um timestamp, apesar de depois só colocarmos no hash 
                    // aqueles que ainda nao temos
                    this.getSensorIdValues(zone[i],id,timestamp).subscribe(
                        resultado =>{
                            for(let value of resultado){
                                if(!this.valuesSensores.get(id).get(value.timestamp)){
                                    this.valuesSensores.get(id).set(value.timestamp,value.value);
                                }
                                else{
                                    break;
                                }
                            }
                        },
                        error =>{
                            console.log(error);
                        }
                    )
                }
            }
        }
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
        return this.http.get(this.httpUtil.url("/reads"),this.httpUtil.headers())
                   .map(this.httpUtil.extrairDados);
    }



}
