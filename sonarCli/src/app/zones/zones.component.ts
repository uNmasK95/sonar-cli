import { Component, OnInit } from '@angular/core';
import { Zone } from "app/models/zone";
import { Router } from "@angular/router";

@Component({
  selector: 'zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {

  zones: Zone[] =  [new Zone(1,"Zona1","Exterior"),new Zone(2,"Zona2","Interior"),new Zone(3,"Zona3","Exterior"),new Zone(4,"Zona4","Exterior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior")]
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  sensorDetails(zone: Zone){
    if(zone.type=="Exterior"){
      this.router.navigate(['/zones/external',zone.id]);
    }else if(zone.type=="Interior"){
      this.router.navigate(['/zones/internal',zone.id]);
    }
  }

}
