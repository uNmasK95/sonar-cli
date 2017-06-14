import { Component, OnInit } from '@angular/core';
import { Sensor } from "app/models/sensor";
import { Router, ActivatedRoute } from "@angular/router";
import { SensorsService } from "app/services/sensors.service";

@Component({
  selector: 'zones-external',
  templateUrl: './zones-external.component.html',
  styleUrls: ['./zones-external.component.css']
})
export class ZonesExternalComponent implements OnInit {
  
  sensors: Sensor[] = [];
  sensorSelected: Sensor = new Sensor("-1","SensorX","Sensor fraco",-1,-1,"hostname.com",0,21);

  zoneId: number = -1;
 // chave = AIzaSyBPDQVLufqJn7UtWpNPAf2tfNUHuoQ4zBQ;
  lat: number = 41.80636;
  lng: number = -8.413773;

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
            sensor = new Sensor(s._id.$oid,s.name,s.description,s.latitude,s.longitude,s.hostname,s.min,s.max);
            this.sensors.push(sensor);
          }
          if(this.sensors.length!=0){
            this.sensorSelected = this.sensors[0];
          }
          //console.log(this.zones)
        }
      );
  }

  sensorChoise(sensor: Sensor){
      this.sensorSelected = sensor;
  }
}
