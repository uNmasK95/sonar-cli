import { Injectable, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpUtilService } from './http-util.service';
import { Router } from '@angular/router';
import { URLSearchParams,Http, Headers, Response, RequestOptions } from '@angular/http';
import { Sensor } from "app/models/sensor";

@Injectable()
export class SensorValuesService implements OnInit {

    @Output() mudeivalore = new EventEmitter();
     //sensorId -> Zona
    valuesZonaSensores: Map<string,string>;
    //sensorId -> Timestamp
    valuesSensoresTimestamp : Map<string,Array<number>>;
    //sensorId -> Leituras
    valuesSensores : Map<string,Array<number>>;
    
    constructor(private router: Router, private http: Http, private httpUtil: HttpUtilService){
        this.valuesZonaSensores = new Map<string,string>();
        this.valuesSensores = new Map<string,Array<number>>();
        this.valuesSensoresTimestamp = new Map<string,Array<number>>();
	}

    //Vai estar sempre a fazer pedidos ao servidor dos sensores.
    ngOnInit(){
        /*setInterval(() => {
            console.log("5 em 5 segundos")
        },5000);*/
    }
    
    getSensor(sensordId: string){
        return this.valuesSensores.get(sensordId);
    }

    getTimeStamp(sensorId:string){
        return this.valuesSensoresTimestamp.get(sensorId);
    }

    // elimina todos pois o utilizador vai fazer logout
    deleteAllValues(){
        this.valuesSensores.clear();
        this.valuesSensoresTimestamp.clear();
        this.valuesZonaSensores.clear();
    }

    // vamos avisar que vamos utilizar estes values para ele atualizar caso nao tenha
    lervalues( graficId :string,zone:string[], sensorId:string[],timestamp: number){
        console.log("vim aqui");
        let i = 0;
        for(let id of sensorId){
            if(!this.valuesSensores.get(id)){
                this.valuesZonaSensores.set(id,zone[i]);
                this.saveResultFirstTime(graficId,id,zone[i],timestamp);
            }
            else{
                // colocar a data de hoje menos o timestamp(hora) que o utilizador quer ver
                let timenow = new Date();
                let t = timenow.getTime()-1000 * 3600 * timestamp;
                // se o primeiro valor for maior que o timestamp pedido quer dizer que nao temos informação desse time, logo vamos buscar tudo
                if(this.valuesSensoresTimestamp.get(id)[0]>t){
                    //aqui vamos buscar todos os values dando um timestamp
                    this.saveResultFirstTime(graficId,id,zone[i],timestamp);
                }
            }
            i++;
        }
    }

    colocavalues(id,valuesTimestamp,valuessenso,graficId){
        this.valuesSensoresTimestamp.set(id,valuesTimestamp); 
        this.valuesSensores.set(id,valuessenso);
        localStorage.setItem(graficId,graficId);
        this.mudeivalore.emit();
    }

    saveResultFirstTime(graficId,id,zona,timestamp){
        console.log(id +" "+ zona + "estou aquiiiiiiiii")
        this.getSensorIdValues(zona,id,timestamp).subscribe(
            resultado =>{
                console.log(resultado)
                console.log("resultado antes");

                //let auxobserver : Observable<Array<number>> = new Observable(observer =>{
                let valuessenso: Array<number> = new Array<number>();
                let valuesTimestamp : Array<number> = new Array<number>();
                for(let value of resultado){
                    valuesTimestamp.push(value.timestamp);
                    valuessenso.push(value.value);
                        //observer.next(value.value);
                }
                this.colocavalues(id,valuesTimestamp,valuessenso,graficId);
               

                    //observer.complete();    
               // });
               // console.log(auxobserver)
                //this.valuesSensores.set(id,auxobserver);
                /*
                this.valuesSensores.set(id,new Observable(observer =>{
                    //colocamos todas as leituras feitas apartir do timestamp
                    console.log("estou dentro do observable");
                    for(let value of resultado){
                        this.valuesSensoresTimestamp.get(id).push(value.timestamp); 
                        observer.next(value.value);
                    }
                    console.log( this.valuesSensoresTimestamp.get(id))
                    console.log("guardei result first time");
                    //aqui vamos de x em x segundos ver se o sensor ja tem mais leituras se tiver guardamos no valor senão continuamos a fazer o mesmo
                    setInterval(() => { 
                        this.getSensorIdValues(zona,id,timestamp).subscribe(
                            resultado =>{
                                console.log("novos valores");
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
                }));*/
            },
            error =>{
                console.log(error);
            }
        )
    }


    // vai buscar todos os values de um sensor, atraves do tempo dado.
    getSensorIdValues(zoneid:string,sensorid:string,timestamp:number){
        let headersParams = { 'Content-Type': 'application/json' };
        if (localStorage['currentUser']) {
            headersParams['Authorization'] = localStorage['currentUser'];
        }
        var search = new URLSearchParams();
        search.set('zone', ''+zoneid);
        search.set('sensor', ''+sensorid);
        search.set('window','6'); //mudar aqui caralho
        let headers = new Headers(headersParams);
        console.log(search);
        let options = new RequestOptions({ headers: headers, search:search});
        return this.http.get(this.httpUtil.url("/reads"),options)
                   .map(this.httpUtil.extrairDados);
    }
/*
    //sensorId -> Zona
    valuesZonaSensores: Map<string,string>;
    //sensorId -> Timestamp
    valuesSensoresTimestamp : Map<string,Array<number>>;
    //sensorId -> Leituras
    valuesSensores : Map<string,Observable<Array<number>>>;
    
    constructor(private router: Router, private http: Http, private httpUtil: HttpUtilService){
        this.valuesZonaSensores = new Map<string,string>();
        this.valuesSensores = new Map<string,Observable<Array<number>>>();
        this.valuesSensoresTimestamp = new Map<string,Array<number>>();
	}

    //Vai estar sempre a fazer pedidos ao servidor dos sensores.
    ngOnInit(){
    }
    
    getSensor(sensordId: string){
        return this.valuesSensores.get(sensordId);
    }
    getTimeStamp(sensorId:string){
        return this.valuesSensoresTimestamp.get(sensorId);
    }

    // elimina todos pois o utilizador vai fazer logout
    deleteAllValues(){
        this.valuesSensores.clear();
        this.valuesSensoresTimestamp.clear();
        this.valuesZonaSensores.clear();
    }

    // vamos avisar que vamos utilizar estes values para ele atualizar caso nao tenha
    lervalues( zone:string[], sensorId:string[],timestamp: number){
        console.log("vim aqui");
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
                console.log(resultado)
                console.log("resultado antes");

                let auxobserver : Observable<Array<number>> = new Observable(observer =>{
                  for(let value of resultado){
                        this.valuesSensoresTimestamp.get(id).push(value.timestamp); 
                        observer.next(value.value);
                        console.log(value);
                    }  
                    observer.complete();    
                });
               // console.log(auxobserver)
                this.valuesSensores.set(id,auxobserver);
                /*
                this.valuesSensores.set(id,new Observable(observer =>{
                    //colocamos todas as leituras feitas apartir do timestamp
                    console.log("estou dentro do observable");
                    for(let value of resultado){
                        this.valuesSensoresTimestamp.get(id).push(value.timestamp); 
                        observer.next(value.value);
                    }
                    console.log( this.valuesSensoresTimestamp.get(id))
                    console.log("guardei result first time");
                    //aqui vamos de x em x segundos ver se o sensor ja tem mais leituras se tiver guardamos no valor senão continuamos a fazer o mesmo
                    setInterval(() => { 
                        this.getSensorIdValues(zona,id,timestamp).subscribe(
                            resultado =>{
                                console.log("novos valores");
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
                console.log("nao da o set")
            },
            error =>{
                console.log(error);
            }
        )
    }


    // vai buscar todos os values de um sensor, atraves do tempo dado.
    getSensorIdValues(zoneid:string,sensorid:string,timestamp:number){
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
    */

}
