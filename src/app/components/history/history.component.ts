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
    public lineChartLabels:Array<any> = ['50s', '55s', '00s', '05s', 
            '10s', '15s', '20s','50s', '55s', '00s', '05s', 
            '10s', '15s', '20s','50s', '55s', '00s', '05s', 
            '10s', '15s', '20s','50s', '55s', '00s', '05s', 
            '10s', '15s', '20s', '15s', '20s'];
    public lineChartOptions:any = {
      responsive: true
      
    };
    public lineChartColors:Array<any> = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
 
    constructor(private zonesService: ZonesService,
                private sensorsService: SensorsService,
                private sensorValuesService: SensorValuesService) { }

    ngOnInit() {
      this.model.init = this.init;
      this.model.hourI = this.hourI;
      this.model.minI = this.minI;
      this.model.finish = this.finish;
      this.model.hourF = this.hourF;
      this.model.minF = this.minF;
      

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
      console.log(this.model.init);

      let size = 0;
      //Percorrer aux2 e buscar reads e colocar em linedata
      console.log(this.aux2.length);
      let values=[];
      for(let i=0;i<this.aux2.length;i++){
        console.log("buscar valores");
        values = [];
        this.lineChartData[i].data = [];
        this.sensorValuesService.getSensorIdValues(this.aux2[i].sensorId,this.aux2[i].zoneId,3600)
          .subscribe(
            res => {
              console.log(res);
              for(let r of res){
                //console.log(r);
                values.push(r.value);
              }
               this.lineChartData[i].data = values;
               this.chart.ngOnChanges({});
               values = [];
            }
          );
          //this.lineChartData[i].data = values;
         // this.chart.ngOnChanges({});
      }
      //console.log("SAI");
      //console.log(this.lineChartData);
      //this.chart.ngOnChanges({});
      //this.sensorValuesService.getSensorIdValues(this.)

      /*let dateNow = new Date();
      dateNow.getDay();


      let init = this.init;
      let hourI = this.hourI;
      let minI = this.minI;
      let finish = this.finish;
      let hourF = this.hourF;
      let minF = this.minF;

      if(this.model.init){
        init = this.model.init;
      }
      if(this.model.hourI){
        hourI = this.model.hourI;
      }
      if(this.model.minI){
        minI = this.model.minI;
      }
      if(this.model.finish){
        finish = this.model.finish;
      }
      if(this.model.hourF){
        hourF = this.model.hourF;
      }
      if(this.model.minF){
        minF = this.model.minF;
      }
      console.log(".....")
      console.log(this.init);
      console.log(this.model.init);
      console.log(this.hourI);
      console.log(this.minI);
      console.log(this.finish);
      console.log(this.hourF);
      console.log(this.minF);
      */
      /*this.sensorsService.update(this.idZone, this.idSensor, name, hostname, description,
        min, max, lat, long)
            .subscribe(
              res => {
                if(this.typeZone==0){//internal
                  this.router.navigate(['/zones/internal',this.idZone]);
                }else{//external
                  this.router.navigate(['/zones/external',this.idZone]);
                }
              }
            );*/
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
   sensors : Sensor[] = new Array(); 

   //function 
   getSensors() { 
      return this.sensors;
   } 
   setSensor(s: Sensor){
       this.sensors.push(s);
   }
   /*removeSensor(i: number){
       this.choises.splice(i,1);
   }
   exists(elem: Element){
       if(this.choises.indexOf(elem)==-1) return false;
       else return true;
   }*/

}
