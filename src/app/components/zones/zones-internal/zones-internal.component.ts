import { Component, OnInit } from '@angular/core';
import { Sensor } from "app/models/sensor";
import { SensorsService } from "app/services/sensors.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'zones-internal',
  templateUrl: './zones-internal.component.html',
  styleUrls: ['./zones-internal.component.css']
})
export class ZonesInternalComponent implements OnInit {
  
  sensors: Sensor[] = [];
  //sensorSelected: Sensor = new Sensor("-1","SensorX","Sensor fraco",-1,-1,"hostname.com",0,21);

  zoneId: number = -1; 
  actives: number[] = [];
  times: Date[] = [];

  constructor(
    private router: Router,
    private sensorsService: SensorsService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
        .params
        .subscribe(params => {
            this.zoneId = params['id'];
    });

    let sensor: Sensor = null;
    this.sensorsService.get(this.zoneId)
      .subscribe(
        res => {
          console.log(res);
          for(let s of res){
            sensor = new Sensor(s._id.$oid,s.name,s.description,null,null,s.hostname,s.min,s.max);
            this.sensors.push(sensor);
            this.times.push(new Date());

            //Ver estado
            this.sensorsService.getState(this.zoneId,sensor.id)
              .subscribe(
                res=> {
                  if(res.state==true){
                    this.actives.push(1); //sensor active
                  }else{
                    this.actives.push(0); //sensor desactive
                  }
                },
                error=>{
                  console.log("getState: Deu erro"); 
                  
                }
              );
          }
          //console.log(this.zones)
        },
        error=>{
          console.log("get: Deu erro"); 
        }
      );
  }

  sensorChoise(sensor: Sensor){
      this.router.navigate(['/zones/internal/'+this.zoneId+'/sensor/'+sensor.id]);
  }

  refresh(sensor,i){
    console.log("update");
    //Ver estado
    this.sensorsService.getState(this.zoneId,sensor.id)
      .subscribe(
        res=> {
          if(res.state==true){
            this.times[i] = new Date();
            this.actives[i] = 1; //sensor active
          }else{
            this.times[i] = new Date();
            this.actives[i] = 0; //sensor desactive
          }
        },
        error=>{
          this.actives[i] = 0;
          this.times[i] = new Date();
          console.log("getState: Deu erro"); 
          
        }
      );
    //this.times[i] = new Date();
  }

  timeAux(date: Date){
    return date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
  } 

  //Ver se esta ativo
  active(sensor,i){
    if(this.actives[i]==1){//active
      return true;
    }else{//inactive
      return false;
    }
  }

  //turnOn sensor
  activeNow(sensor,i){
    this.sensorsService.turnOn(this.zoneId,sensor.id)
      .subscribe(
        res => {
          console.log("TURNON: Nao deu erro:"+i); 

          this.actives[i]=1; //Por active
        },
        error=>{
          console.log("TURNON: Deu erro"); 
          console.log(error);
        }
      );
  }

  //turnOff sensor
  turnOff(sensor,i){
    this.sensorsService.turnOff(this.zoneId,sensor.id)
      .subscribe(
        res => {
          console.log("TURNOFF: Nao deu erro"); 
          this.actives[i]=0; //Por inactive
        },
        error=>{
          console.log("TURNOFF: Deu erro"); 
          console.log(error);
        }
      );
  }

  getType(){
    if(localStorage.getItem('userOn')){
      let p =JSON.parse(localStorage.getItem('userOn')).user_type
      if(p==0){
        return true;
      }
    }
    return false;
  }
}
