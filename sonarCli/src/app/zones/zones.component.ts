import { Component, OnInit } from '@angular/core';
import { Zone } from "app/models/zone";
import { Router } from "@angular/router";
import { ZonesService } from "app/services/zones.service";

@Component({
  selector: 'zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {

  /*zones: Zone[] =  [new Zone(1,"Zona1","Exterior"),new Zone(2,"Zona2","Interior"),new Zone(3,"Zona3","Exterior"),new Zone(4,"Zona4","Exterior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior"),new Zone(2,"Zona2","Interior")]*/
  zones: Zone[] = [];

  constructor(
    private router: Router,
    private zonesService: ZonesService) { }

  ngOnInit() {
    let zone: Zone = null;
    this.zonesService.getAll()
      .subscribe(
        res => {
          for(let z of res){
            zone = new Zone(z._id.$oid,z.name,z.description,z.type,z.min,z.max);
            this.zones.push(zone);
          }
        }
      );
  }

  typeZone(idZ: number): string{
    if(idZ==0){//Internal
      return "Internal";
    }else{
      return "External";
    }
  }

  sensorDetails(zone: Zone){
    if(zone.type==1){
      this.router.navigate(['/zones/external',zone.id]);
    }else if(zone.type==0){
      this.router.navigate(['/zones/internal',zone.id]);
    }
  }

}
