import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ZonesService } from "app/services/zones.service";
import { SensorsService } from "app/services/sensors.service";
import { Sensor } from "app/models/sensor";

@Component({
  selector: 'zones-sensor-edit',
  templateUrl: './zones-sensor-edit.component.html',
  styleUrls: ['./zones-sensor-edit.component.css']
})
export class ZonesSensorEditComponent implements OnInit {

  model: any = {};
  typeZone: number = -1;
  idZone: number = -1;
  idSensor: number = -1;
  sensor: Sensor = new Sensor("-1","","",-1,-1,"",0,0);;

  constructor(private route: ActivatedRoute,
              private zonesService: ZonesService,
              private sensorsService: SensorsService,
              private router: Router) { }

  ngOnInit() {
    this.route
        .params
        .subscribe(params => {
            this.idZone = params['id'];
            this.idSensor = params['id2'];
            this.zonesService.get(this.idZone)
              .subscribe(
                res => {
                  this.typeZone=res.type;
                }
              )
        });
    this.sensorsService.getSensor(this.idZone,this.idSensor)
      .subscribe(res => {
        this.sensor = new Sensor(res._id.$oid,res.name,res.description,res.latitude,res.longitude,res.hostname,res.min,res.max);
        console.log(this.sensor)
      });
  }

  updateSensor(){
    let name = this.sensor.name;
    let hostname = this.sensor.hostname;
    let description = this.sensor.description;
    let min = this.sensor.min;
    let max = this.sensor.max;
    let lat = this.sensor.latitude;
    let long = this.sensor.longitude;
    if(this.model.nameS){
      name = this.model.nameS;
    }
    if(this.model.hostnameS){
      hostname = this.model.hostnameS;
    }
    if(this.model.descS){
      description = this.model.descS;
    }
    if(this.model.min){
      min = this.model.min;
    }
    if(this.model.max){
      max = this.model.max;
    }
    if(this.model.lat){
      lat = this.model.lat;
    }
    if(this.model.long){
      long = this.model.long;
    }

    this.sensorsService.update(this.idZone, this.idSensor, name, hostname, description,
      min, max, lat, long)
          .subscribe(
            res => {
              if(this.typeZone==0){//internal
                this.router.navigate(['/zones/internal',this.idZone]);
              }else{//external
                this.router.navigate(['/zones/external',this.idZone]);
              }
            }
          );

  }
}
