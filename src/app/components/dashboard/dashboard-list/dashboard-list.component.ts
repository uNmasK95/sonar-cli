import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Row } from "../../../models/row";
import { RowService } from "../../../services/row.service";
import { GraficService } from "../../../services/grafic.service";
import { Grafic } from "../../../models/grafic";
import { User } from "../../../models/user";
import { Metric } from "app/models/metric";

@Component({
  selector: 'dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent implements OnInit {

  @Input() timestamp : number;
  
  userOn : User;
  createRowOn : boolean = false;
  model: any = {};
  rows: Row[] = [];

  constructor(private rowService:RowService,
              private graficService:GraficService) { }

  ngOnInit() {
    this.userOn = JSON.parse(localStorage.getItem('userOn'));
    console.log(this.userOn)
    this.getRows();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    console.log(this.timestamp);
  }

  createRowCancel(){
    this.createRowOn = false;
    this.model.name ="";
  }
  createRowRegister(){
    this.createRowOn = true;  
  }

  //Criar linha
  createRow(){
    this.rowService.createRow(this.userOn.id,this.model.name).subscribe(
      resultado =>{
        let graficos: Grafic[] = [];
        let rowaux = new Row(resultado._id.$oid,resultado.name,graficos)
        this.rows.push(rowaux);
      },
      error =>{
        console.log(error);
      }
    );
  }

  eliminalinha(){
    let deleteRow: Row = JSON.parse(localStorage.getItem("deleteRow")).row;
    console.log(deleteRow);
    this.rowService.deleteRow(this.userOn.id,deleteRow.id).subscribe(
      resultado =>{
        let rowDelete = this.rows.find(x => x.id == deleteRow.id);
        let i = this.rows.indexOf(rowDelete);
        this.rows.splice(i,1);
      },
      error =>{
        console.log(error);
      }
    );
  }

  getRows(){
    this.rowService.getRows(this.userOn.id).subscribe(
      resultado =>{
        console.log(resultado);
        for(let row of resultado){
          
          let graficos: Grafic[] = [];
          if(row.graphics){
            for( let grafic of row.graphics){
              let metrics : Metric[] = [];
              if(grafic.metrics){
                for( let metric of grafic.metrics){
                  let metricaux = new Metric(metric._id.$oid,metric.name,metric.zone_id.$oid,metric.sensor_id.$oid);
                  metrics.push(metricaux);
                }
              }
              let graphic = new Grafic(grafic._id.$oid,grafic.name,grafic.rangeTime,metrics); 
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
