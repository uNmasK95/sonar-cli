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
          console.log(res);
          for(let s of res){
            sensor = new Sensor(s._id.$oid,s.name,s.description,s.latitude,s.longitude,s.hostname,s.min,s.max);
            this.sensors.push(sensor);
          }
          if(this.sensors.length!=0){
            this.sensorSelected = this.sensors[0];
            this.lat = this.sensors[0].latitude;
            this.lng = this.sensors[0].longitude;
          }
          //console.log(this.zones)
        }
      );

    //Initial values for map


  }

  sensorChoise(sensor: Sensor){
      this.sensorSelected = sensor;
      this.lat = sensor.latitude;
      this.lng = sensor.longitude;
  }

  toString(v){
    return ""+v;
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