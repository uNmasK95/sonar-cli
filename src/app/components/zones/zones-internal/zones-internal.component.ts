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
          //console.log(this.zones)
        }
      );
  }

  sensorChoise(sensor: Sensor){
      this.router.navigate(['/zones/internal/'+this.zoneId+'/sensor/'+sensor.id]);
  }

  refresh(sensor){
    console.log("update");
  }

  //Ver se esta ativo
  active(sensor){
    return false;;
  }

  //turnOn sensor
  activeNow(sensor){
    console.log("Ativar");
  }

  //turnOff sensor
  turnOff(sensor){
    console.log("Desativar");
  }
}
