import { Component, OnInit, ViewChild } from '@angular/core';
import { Zone } from "app/models/zone";
import { Sensor } from "app/models/sensor";
import { SensorsService } from "app/services/sensors.service";
import { ZonesService } from "app/services/zones.service";
import { BaseChartDirective } from "ng2-charts";

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
  public sensors: Sensor[] = [];
  public sensorsGraphic: SensorGraphic[] = [];

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  
   public lineChartData:Array<any> = [
    {/*data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Sensor1'*/}/*,
    {data: [28, 48, 40, 19, 86, 27, 90,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Sensor2'},
    {data: [18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40], label: 'Sensor3'}*/
  ];  
    public lineChartLabels:Array<any> = ['50s', '55s', '00s', '05s', 
            '10s', '15s', '20s','50s', '55s', '00s', '05s', 
            '10s', '15s', '20s','50s', '55s', '00s', '05s', 
            '10s', '15s', '20s','50s', '55s', '00s', '05s', 
            '10s', '15s', '20s'];
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
                private sensorsService: SensorsService) { }

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
            if(this.zones.length!=0){
              this.model.zoneS = this.zones[0].name;

              let sensor: Sensor = null;
              this.sensorsService.get(this.zones[0].id)
                  .subscribe(
                    res => {
                      for(let s of res){
                        sensor = new Sensor(s._id.$oid,s.name,s.description,s.latitude,s.longitude,s.hostname,s.min,s.max);
                        this.sensors.push(sensor);
                      }
                      if(this.sensors.length!=0){//Have sensors
                        this.model.sensorS = this.sensors[0].name; 
                      }else{//No sensors
                        this.model.sensorS = null;
                      }
                    }
                  );
            }
          }
        );
        
        for(let e of this.lineChartData){
          this.sensorsGraphic.push(e.label);
        }
     
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
    getSensors($event){
      console.log($event);
      this.sensors = [];
      let zoneSelected: Zone = this.zones.find(res => res.name==$event);

      let sensor: Sensor = null;
      this.sensorsService.get(zoneSelected.id)
          .subscribe(
            res => {
              for(let s of res){
                sensor = new Sensor(s._id.$oid,s.name,s.description,s.latitude,s.longitude,s.hostname,s.min,s.max);
                this.sensors.push(sensor);
              }
              if(this.sensors.length!=0){//have sensors
                this.model.sensorS = this.sensors[0].name; 
              }else{
                this.model.sensorS = null;
              }
            }
          );
    }

    //Change sensor on graphic
    changeSensorGraphic($event){
      console.log($event);
      let i = this.lineChartData.length;
      console.log("i:"+i);
      if(i==1){
        this.lineChartData[0] = {data: new Array(), label: $event};
        this.lineChartData[0].data = [20, 20, 20,20, 20, 20, 20,20, 20, 20, 20, 20, 20, 20,20, 20, 20, 20, 20, 20, 20,65, 59, 80, 81, 56, 55, 40];
      }else{
        for(let j=0;j<this.lineChartData.length;j++){
          if(this.lineChartData[0].label==$event){
            this.lineChartData[i] = {data: new Array(), label: $event};
            this.lineChartData[i].data = [20, 20, 20,20, 20, 20, 20,20, 20, 20, 20, 20, 20, 20,20, 20, 20, 20, 20, 20, 20,65, 59, 80, 81, 56, 55, 40];
          }
        }
      }
      if($event=="sensor"){
        this.lineChartData[0] = {data: new Array(), label: $event};
        this.lineChartData[0].data = [20, 20, 20,40, 20, 20, 20,20, 40, 20, 20, 20, 20, 20,20, 20, 20, 20, 20, 20, 20,65, 59, 80, 81, 56, 55, 40];
      }
      this.chart.ngOnChanges({});
    }
    
    //Add sensor to graphic
    addSensor(){
      console.log(this.model.zoneS);
      console.log(this.model.sensorS);

      /*let _lineChartData:Array<any> = new Array(this.lineChartData.length);
      _lineChartData[2] = {data: new Array(this.lineChartData[2].data.length), label: this.lineChartData[2].label};
      for (let j = 0; j < this.lineChartData[2].data.length; j++) {
        _lineChartData[2].data[j] = Math.floor((Math.random() * 100) + 1);
      }
      this.lineChartData = _lineChartData;*/

      //this.lineChartData[2] = {data: new Array(this.lineChartData[2].data.length), label: this.lineChartData[2].label};
      //this.lineChartData[2].data = [20, 20, 20,20, 20, 20, 20,20, 20, 20, 20, 20, 20, 20,20, 20, 20, 20, 20, 20, 20,65, 59, 80, 81, 56, 55, 40];
       // {data: [20, 20, 20,20, 20, 20, 20,20, 20, 20, 20, 20, 20, 20,20, 20, 20, 20, 20, 20, 20,65, 59, 80, 81, 56, 55, 40], label: 'SensorNovo'};
      
     /* let _lineChartData:Array<any> = new Array(this.lineChartData.length);
      for (let i = 0; i < this.lineChartData.length; i++) {
        _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
        for (let j = 0; j < this.lineChartData[i].data.length; j++) {
          if(i==2){
            _lineChartData[i].data[j] =32;
            _lineChartData[i].label = this.model.sensorS;
          }else{
            _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
          }
        }
      }
      this.lineChartData = _lineChartData;*/

      /*for (let j = 0; j < this.lineChartData[2].data.length; j++) {
          
        this.lineChartData[2].data[j] =32;
        this.lineChartData[2].label = this.model.sensorS;
         
      }*/
      let i = this.lineChartData.length;
      console.log(i);
      this.lineChartData[i] = {data: new Array(), label: this.model.sensorS};
      //this.lineChartData[i].data = [20, 20, 20,20, 20, 20, 20,20, 20, 20, 20, 20, 20, 20,20, 20, 20, 20, 20, 20, 20,65, 59, 80, 81, 56, 55, 40];

      this.chart.ngOnChanges({});

      //this.lineChartData = this.lineChartData.slice();
      console.log(this.lineChartData)

  }

  remove(sensor){
    console.log("remove");
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
