import { Component, OnInit } from '@angular/core';
import { Sensor } from "app/models/sensor";

@Component({
  selector: 'zones-internal',
  templateUrl: './zones-internal.component.html',
  styleUrls: ['./zones-internal.component.css']
})
export class ZonesInternalComponent implements OnInit {
  
  sensors: Sensor[] = [new Sensor(1,"Sensor1","Sensor mt bonito",12.31,12.3,1),new Sensor(2,"Sensor2","Sensor feio",21.2,122,1),new Sensor(3,"Sensor3","Sensor top",95,11,1)]
  sensorSelected: Sensor = new Sensor(-1,"SensorX","Sensor fraco",-1,-1,1);

  zoneId: number = 2; //Este é pra ir buscar ao url

  constructor() { }

  ngOnInit() {
  }

}
