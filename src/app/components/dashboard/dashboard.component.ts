import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Zone } from "app/models/zone";
import { Sensor } from "app/models/sensor";
import { ZonesService } from "app/services/zones.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  model : any = {};
  zones : Zone[] = [];
  sensor_zones : Map<string,Sensor[]>;
  doneok: boolean = false;

  constructor( private zonesService: ZonesService) { 
                this.sensor_zones = new Map<string,Sensor[]>();}
//oma dashboard tem linhas uma linha tem varios graficos e um grafico tem metricas
  ngOnInit() {
    this.zonesService.getAll().subscribe(
      resultado =>{
        for (let zona of resultado){
          let zonaaux = new Zone(zona._id.$oid,zona.name,zona.description,zona.type,zona.min,zona.max);
          this.zones.push(zonaaux);
          let sensores : Sensor[] = [];
          if(zona.sensors){
            for(let sensor of zona.sensors){
              let sensoraux = new Sensor(sensor._id.$oid,sensor.name,sensor.description,sensor.latitude,sensor.longitude,sensor.hostname,sensor.min,sensor.max);
              sensores.push(sensoraux);
            }
          }
          this.sensor_zones.set(zona._id.$oid,sensores);
        }
        this.doneok = true;
      },
      error => {

      }
    )
    this.model.timestamp = 10;
    this.model.refresh = 5;
  }
}
