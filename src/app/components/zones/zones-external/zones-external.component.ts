import { Component, OnInit } from '@angular/core';
import { Sensor } from "app/models/sensor";
import { Router, ActivatedRoute } from "@angular/router";
import { SensorsService } from "app/services/sensors.service";
import { AgmCoreModule } from '@agm/core';

@Component({
  selector: 'zones-external',
  templateUrl: './zones-external.component.html',
  styleUrls: ['./zones-external.component.css']
})
export class ZonesExternalComponent implements OnInit {
  
  sensors: Sensor[] = [];
  sensorSelected: Sensor = new Sensor("-1","SensorX","Sensor fraco",-1,-1,"hostname.com",0,21);
  sensorsDate: Array<any> = [];
  zoneId: number = -1;
 // chave = AIzaSyBPDQVLufqJn7UtWpNPAf2tfNUHuoQ4zBQ;

  //Map--------
  // google maps zoom level
  zoom: number = 8;
  
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  markers: marker[] = [
	  {
		  lat: 51.673858,
		  lng: 7.815982,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: 51.373858,
		  lng: 7.215982,
		  label: 'B',
		  draggable: false
	  },
	  {
		  lat: 51.723858,
		  lng: 7.895982,
		  label: 'C',
		  draggable: true
	  }
  ]
  //Map--------

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
          for(let s of res){
            sensor = new Sensor(s._id.$oid,s.name,s.description,s.latitude,s.longitude,s.hostname,s.min,s.max);
            this.sensors.push(sensor);
            this.sensorsDate.push({sensor: sensor.id, date: new Date(), state: 0}); //initial

          }
          if(this.sensors.length!=0){
            this.sensorSelected = this.sensors[0];
            this.lat = this.sensors[0].latitude;
            this.lng = this.sensors[0].longitude;
          }
          //Ver estado
          for(let j=0; j<this.sensorsDate.length;j++){
            this.sensorsService.getState(this.zoneId,this.sensorsDate[j].sensor)
              .subscribe(
                resu=> {
                  if(resu.state==true){
                    this.sensorsDate[j] = {sensor: this.sensorsDate[j].sensor, date: new Date(), state: 1}; //sensor active
                  }else{
                    this.sensorsDate[j] = {sensor: this.sensorsDate[j].sensor, date: new Date(), state: 0}; //sensor desactive
                  }
                },
                error=>{
                  console.log("getState: Deu erro"); 
                }
              );
          }
        }
      );

  }

  sensorChoise(sensor: Sensor){
      this.sensorSelected = sensor;
      this.lat = sensor.latitude;
      this.lng = sensor.longitude;
      let i = this.sensorsDate.findIndex(res => res.sensor==sensor.id);
      let aux = this.sensorsDate.find(res => res.sensor==sensor.id);
      this.sensorsDate[i] = {sensor: sensor.id, date: new Date(), state: aux.state};
  }

  timeAux(){
    let aux = this.sensorsDate.find(res => res.sensor==this.sensorSelected.id);
    if(!aux) return "";
    return aux.date.getHours()+':'+aux.date.getMinutes()+':'+aux.date.getSeconds();
  }

  toString(v){
    return ""+v;
  }

  refresh(){
    let i = this.sensorsDate.findIndex(res => res.sensor==this.sensorSelected.id);
    let aux = this.sensorsDate.find(res => res.sensor==this.sensorSelected.id);

    this.sensorsService.getState(this.zoneId,this.sensorSelected.id)
              .subscribe(
                resu=> {
                  if(resu.state==true){
                    this.sensorsDate[i] = {sensor: this.sensorSelected.id, date: new Date(), state: 1}; //sensor active
                  }else{
                    this.sensorsDate[i] = {sensor: this.sensorSelected.id, date: new Date(), state: 0}; //sensor inactive
                  }
                },
                error=>{
                  this.sensorsDate[i] = {sensor: this.sensorSelected.id, date: new Date(), state: 0}; //sensor inactive
                  console.log("getState: Deu erro"); 
                }
              );
  } 

  //Ver se esta ativo
  active(){
    if(this.sensorsDate.length==0) return false;
    let aux = this.sensorsDate.find(res => res.sensor==this.sensorSelected.id);
    if(aux.state==1){//active
      return true;
    }else{//inactive
      return false;
    }
  }

  //turnOn sensor
  activeNow(){
    let i = this.sensorsDate.findIndex(res => res.sensor==this.sensorSelected.id);
    let aux = this.sensorsDate.find(res => res.sensor==this.sensorSelected.id);
    this.sensorsService.turnOn(this.zoneId,this.sensorSelected.id)
      .subscribe(
        res => {
          this.sensorsDate[i] = {sensor: this.sensorSelected.id, date: new Date(), state: 1}; //Por active
        },
        error=>{
          console.log(error);
        }
      );
  }

  //turnOff sensor
  turnOff(){
    let i = this.sensorsDate.findIndex(res => res.sensor==this.sensorSelected.id);
    let aux = this.sensorsDate.find(res => res.sensor==this.sensorSelected.id);
    this.sensorsService.turnOff(this.zoneId,this.sensorSelected.id)
      .subscribe(
        res => {
          this.sensorsDate[i] = {sensor: this.sensorSelected.id, date: new Date(), state: 0}; //Por inactive
        },
        error=>{
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

  //Map-------
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  //Map-------

}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}