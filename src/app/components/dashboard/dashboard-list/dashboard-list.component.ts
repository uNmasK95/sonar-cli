import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Row } from "../../../models/row";
import { RowService } from "../../../services/row.service";
import { GraficService } from "../../../services/grafic.service";
import { Grafic } from "../../../models/grafic";

@Component({
  selector: 'dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent implements OnInit {

  @Input() timestamp : number;
  
  rows: Row[] = [];

  constructor(private rowService:RowService,
              private graficService:GraficService) { }

  ngOnInit() {
    this.getRows();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.timestamp);
  }

  getRows(){
    let user = JSON.parse(localStorage.getItem('userOn'));
    this.rowService.getRows(user.id).subscribe(
      resultado =>{
        console.log(resultado);
        for(let row of resultado){
          
          let graficos: Grafic[] = [];
          if(row.graphics){
            for( let grafic of row.graphics){
              let graphic = new Grafic(grafic._id.$oid,grafic.name,grafic.rangeTime); 
              graficos.push(graphic);
            }
          }
          let rowaux = new Row(row._id.$oid,row.name,graficos);
          this.rows.push(rowaux);
        }
        console.log(resultado);
      },
      error =>{
        console.log(error)
      }
    )
  }

}
