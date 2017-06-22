import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ZonesService } from "app/services/zones.service";
import { SensorsService } from "app/services/sensors.service";

@Component({
  selector: 'zones-sensor-create',
  templateUrl: './zones-sensor-create.component.html',
  styleUrls: ['./zones-sensor-create.component.css']
})
export class ZonesSensorCreateComponent implements OnInit {
  model: any = {};
  typeZone: number = -1;
  idZone: number = -1;

  constructor(private route: ActivatedRoute,
              private zonesService: ZonesService,
              private sensorsService: SensorsService,
              private router: Router) { }

  ngOnInit() {
    this.route
        .params
        .subscribe(params => {
            this.idZone = params['id'];
            this.zonesService.get(this.idZone)
              .subscribe(
                res => {
                  this.typeZone=res.type;
                }
              )
        });
  }

  createSensor(){
    this.sensorsService.create(this.idZone,this.model.nameS,this.model.hostnameS,this.model.descS,
      this.model.min, this.model.max, this.model.lat, this.model.long)
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
