import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ZonesService } from "app/services/zones.service";

@Component({
  selector: 'zones-create',
  templateUrl: './zones-create.component.html',
  styleUrls: ['./zones-create.component.css']
})
export class ZonesCreateComponent implements OnInit {

  model: any = {};

  constructor(private route: ActivatedRoute,
              private zonesService: ZonesService,
              private router: Router) { }

  ngOnInit() {
  }

  createZone(){
    let aux = 0;
    if(this.model.type=="External") aux=1;
    this.zonesService.create(this.model.nameS,this.model.descS,aux,
      this.model.min, this.model.max)
          .subscribe( res => {
              this.router.navigate(['/zones']);
            }
          );

  }
}
