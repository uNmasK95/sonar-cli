import { Component, OnInit } from '@angular/core';
import { Sensor } from "app/models/sensor";

@Component({
  selector: 'zones-external',
  templateUrl: './zones-external.component.html',
  styleUrls: ['./zones-external.component.css']
})
export class ZonesExternalComponent implements OnInit {
  sensors: Sensor[] = [new Sensor(1,"Sensor1",12.31,12.3,1),new Sensor(2,"Sensor2",21.2,122,1),new Sensor(3,"Sensor3",95,11,1)]
  sensorSelected: Sensor = new Sensor(-1,"SensorX",-1,-1,1);
  
  constructor() { }

  ngOnInit() {
  }

  sensorChoise(sensor: Sensor){
      this.sensorSelected = sensor;
  }
}
