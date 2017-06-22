import { Component, OnInit } from '@angular/core';
import { Zone } from "app/models/zone";
import { Router } from "@angular/router";
import { ZonesService } from "app/services/zones.service";
import { FilterPipe2 } from "app/services/FilterPipe2";

@Component({
  selector: 'zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {

  model : any = {};
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

  getType(){
    if(localStorage.getItem('userOn')){
      let p =JSON.parse(localStorage.getItem('userOn')).user_type
      if(p==0){
        return true;
      }
    }
    return false;
  }

}
