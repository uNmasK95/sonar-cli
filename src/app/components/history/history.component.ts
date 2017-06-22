import { Component, OnInit, ViewChild } from '@angular/core';
import { Zone } from "app/models/zone";
import { Sensor } from "app/models/sensor";
import { SensorsService } from "app/services/sensors.service";
import { ZonesService } from "app/services/zones.service";
import { BaseChartDirective } from "ng2-charts";
import { SensorValuesService } from "app/services/sensorvalues.service";

@Component({
  selector: 'history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  
  model: any = {};

  public dateNow: Date = new Date();
  public init: string = this.formatDate(new Date(Date.now() - 864e5));
  public hourI: number = this.dateNow.getHours();
  public minI: number = this.dateNow.getMinutes();
  public finish: string = this.formatDate(this.dateNow);
  public hourF: number = this.dateNow.getHours();
  public minF: number = this.dateNow.getMinutes();

  public zones: Zone[] = [];
  public sensors: Array<any> = [[]];
  public sensorsGraphic: SensorGraphic[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    
    public aux2: Array<any> = [ {zone: "First Zone Ex", zoneId: -1, sensor: "First Sensor Ex", sensorId: -1} ];

    public aux: Array<any> = [
    [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40],
     [28, 48, 40, 19, 86, 27, 90,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40],
     [18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40]
  ];  

   public lineChartData:Array<any> = [
     {data: [], label: 'First Sensor Ex'}
   /* {data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Sensor1'}/*,
    {data: [28, 48, 40, 19, 86, 27, 90,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Sensor2'},
    {data: [18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40], label: 'Sensor3'}*/
  ];  
    public lineChartLabels:Array<any> = [/*'50s', '55s', '00s', '05s', 
            '10s', '15s', '20s','50s', '55s', '00s', '05s', 
            '10s', '15s', '20s','50s', '55s', '00s', '05s', 
            '10s', '15s', '20s','50s', '55s', '00s', '05s', 
            '10s', '15s', '20s', '15s', '20s','10s', '15s', '20s', '15s', '20s','10s', '15s', '20s', '15s', '20s'*/
            ];
    public lineChartOptions:any = {
        responsive: true,
        data: [{
            type: "line",
        }],
        
        elements:{
            point:{
              radius:1
            }
          },
        scales: {
          
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: true
          }],}
      
    };

    public lineChartColors:Array<any> = [
      { // red
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(255,0,0,1)',
      },
      { // green
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(0,255,0,1)',
      },
      { // blue
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(7, 0, 133, 1)',
      },
      { // grey
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(148,159,177,1)',
      },
      { // roxo
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(249, 77, 255, 1)',
      }
      
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
 
    constructor(private zonesService: ZonesService,
                private sensorsService: SensorsService,
                private sensorValuesService: SensorValuesService) { }

    ngOnInit() {
      if(localStorage['metrics']){//já foram definidas todas as metricas
        this.model.init = localStorage['metrics'].getInit();
        this.model.hourI = localStorage['metrics'].getHourI();
        this.model.minI = localStorage['metrics'].getMinI();
        this.model.finish = localStorage['metrics'].getFinish();
        this.model.hourF = localStorage['metrics'].getHourF();
        this.model.minF = localStorage['metrics'].getMinF();
        //Percorrer array sensor localhost
        for(let i=0;i<localStorage['metrics'].getSensors().length;i++){
          if(i!=0){
            this.aux2.push({zone: localStorage['metrics'].getSensors()[i].zone,
                zoneId: localStorage['metrics'].getSensors()[i].zoneId, 
                sensor: localStorage['metrics'].getSensors()[i].sensor, 
                sensorId: localStorage['metrics'].getSensors()[i].sensorId});
            this.aux2[i] = (localStorage['metrics'].getSensors())[i].zone;
          }else{
            this.aux2[i].zone=localStorage['metrics'].getSensors()[i].zone;
            this.aux2[i].zoneId=localStorage['metrics'].getSensors()[i].zoneId;
            this.aux2[i].sensor=localStorage['metrics'].getSensors()[i].sensor;
            this.aux2[i].sensorId=localStorage['metrics'].getSensors()[i].sensorId;
          }
        }
      }else{ //ainda nao foram
        this.model.init = this.init;
        this.model.hourI = this.hourI;
        this.model.minI = this.minI;
        this.model.finish = this.finish;
        this.model.hourF = this.hourF;
        this.model.minF = this.minF;
      }

      let zone: Zone = null;
      this.zonesService.getAll()
        .subscribe(
          res => {
            for(let z of res){
              zone = new Zone(z._id.$oid,z.name,z.description,z.type,z.min,z.max);
              this.zones.push(zone);
            }
          }
        );
        
        for(let e of this.lineChartData){
          this.sensorsGraphic.push(e.label);
        }

        console.log(this.lineChartData);
     
    }
  
    //#################Chart################
 
    // events
    public chartClicked(e:any):void {
      console.log(e);
    }
  
    public chartHovered(e:any):void {
      console.log(e);
    }
    //#################Chart################

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }

    updateMetrics(){
      console.log("Mudei");
      let init = this.model.init;
      let initD = new Date(init);
      let year = initD.getFullYear();
      let month = initD.getMonth();
      let day = initD.getDate();
      let hourI = this.model.hourI;
      let minI = this.model.minI;
      let timestampI = + new Date(year, month, day, hourI, minI, 0, 0);
      console.log(timestampI);
      
      let finish = this.model.finish;
      let finishD = new Date(finish);
      let yearF = finishD.getFullYear();
      let monthF = finishD.getMonth();
      let dayF = finishD.getDate();
      let hourF = this.model.hourF;
      let minF = this.model.minF;
      let timestampF = + new Date(yearF, monthF, dayF, hourF, minF, 0, 0);
      console.log(timestampF);

      //Dividir o eixo x
      let tamanho = timestampF/1000-timestampI/1000;
      let timestampAux = timestampI/1000;
      this.lineChartLabels = [];
      let nr = tamanho/5;
      for(let i=0;i<=nr;i++){
        let aux = i+1;
        this.lineChartLabels.push(''+timestampAux);
       // console.log(timestampAux);
        timestampAux+=5;
      }
     // console.log(this.lineChartLabels);

      //Buscar valores leituras
      let size = 0;
      //Percorrer aux2 e buscar reads e colocar em linedata
      console.log(this.aux2.length);
      let values: Array<any> =[];
      let rValues = [];
     // let valuesTime = [];
      for(let i=0;i<this.aux2.length;i++){
        console.log("buscar valores");
        values = [];
        rValues = [];
        this.lineChartData[i].data = [];
        this.sensorValuesService.getSensorIdValues2(this.aux2[i].sensorId,this.aux2[i].zoneId,timestampI/1000,timestampF/1000)
          .subscribe(
            res => {
              //console.log(res);
              for(let r of res){//recebeu valores, guardar no sitio certo
                //console.log(r);
                values.push( {value: r.value, timestamp: r.timestamp});
                //valuesTime.push(new Date(r.timestamp*1000));
              }
              console.log("values lidos:");
              console.log(values);
              for(let k=0;k<this.lineChartLabels.length-1;k++){
                let timesAux = parseInt(this.lineChartLabels[k]);
                let timesAuxFim = parseInt(this.lineChartLabels[k+1]);
                //console.log(timesAux);
                let findTimestamp = values.find(res => res.timestamp>=timesAux && res.timestamp<timesAuxFim); 
                //console.log("Encontrou?");
                console.log(findTimestamp);
                if(findTimestamp){//Encontrou
                  rValues.push(findTimestamp.value);
                }else{//Nao encontrou
                  rValues.push(0);
                }
              }
               this.lineChartData[i].data = rValues;
               this.chart.ngOnChanges({});
               values = [];
               rValues = [];
               //console.log(valuesTime);
               //valuesTime = [];
            }
          );
          //this.lineChartData[i].data = values;
         // this.chart.ngOnChanges({});
      }
    }

    //When select of zone changes, get the respective sensors
    getSensors($event, i){
      console.log($event);
      let zoneSelected: Zone = this.zones.find(res => res.id==$event);

      let sensor: Sensor = null;
      this.sensorsService.get(zoneSelected.id)
          .subscribe(
            res => {
              this.sensors[i] = new Array();
              for(let s of res){
                sensor = new Sensor(s._id.$oid,s.name,s.description,s.latitude,s.longitude,s.hostname,s.min,s.max);
                  this.sensors[i].push(sensor);
              }
              this.aux2[i].zone = zoneSelected.name;
              this.aux2[i].zoneId = $event;
            }
          );
        console.log(this.aux2);
    }

    //Change sensor on graphic
    changeSensorGraphic($event,i){
      let sensorSelected: Sensor = this.sensors[i].find(res => res.id==$event);

      this.lineChartData[i] = { data: new Array(), label: sensorSelected.name }
      this.aux2[i].sensor = sensorSelected.name;
      this.aux2[i].sensorId = $event;

      this.chart.ngOnChanges({});
    }
    
    //Add sensor to graphic
    addSensor(){
      let i = this.lineChartData.length;
      console.log(i);
      this.lineChartData.push({data: new Array(), label: "New Sensor"});
      this.aux2.push({zone: "New Zone",zoneId: 0, sensor: "New Sensor", sensorId: 0});

      this.chart.ngOnChanges({});

      
      /*console.log(this.lineChartData);
      console.log(this.aux2);*/

  }

  remove(i){
    this.lineChartData.splice(i,1);
    this.aux2.splice(i,1);
    
    this.chart.ngOnChanges({});

  }

  myName(i){
    return "nameS"+i;
  }

/*public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }*/
}

class SensorGraphic { 
   //field 
   sensors : Array<any> = []; 
   init: string = "";
   hourI: number = -1;
   minI: number = -1;
   finish: string = "";
   hourF: number = -1;
   minF: number = -1;
   //function 
   getSensors() { 
      return this.sensors;
   } 
   setSensor(z,zId,s,sId){
       this.sensors.push({zone: z,zoneId: zId, sensor:s, sensorId: sId});
   }
   getInit() { 
      return this.init;
   } 
   setInit(i){
       this.init = i;
   }
   getHourI() { 
      return this.hourI;
   } 
   setHourI(h){
       this.hourI = h;
   }
   getMinI() { 
      return this.minI;
   } 
   setMinI(m){
       this.minI = m;
   }
   getFinish() { 
      return this.finish;
   } 
   setFinish(f){
       this.finish = f;
   }
   getHourF() { 
      return this.hourF;
   } 
   setHourF(h){
       this.hourF = h;
   }
   getMinF() { 
      return this.minF;
   } 
   setMinF(m){
       this.minF = m;
   }

}
