import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Row } from "app/models/row";
import { Grafic } from "app/models/grafic";
import { ZonesService } from "app/services/zones.service";
import { Zone } from "app/models/zone";
import { Sensor } from "app/models/sensor";
import { Metric } from "app/models/metric";
import { MetricService } from "app/services/metric.service";
import { User } from "app/models/user";
import { GraficService } from "app/services/grafic.service";

@Component({
  selector: 'dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.css']
})
export class DashboardEditComponent implements OnInit {

  @Input() timestamp: number;
  
  removegraphic: boolean = false;
  model : any = {};
  zones : Zone[] = [];
  sensor_zones : Map<string,Sensor[]>;
  row: Row;
  graficSelectNow : Grafic;
  sensors : Sensor[];

  userOn : User;
  public aux2: Array<Metric> = [];

  constructor(private zonesService: ZonesService,private graficService:GraficService, private metricService:MetricService) { 
    this.sensor_zones = new Map<string,Sensor[]>();
  }

  ngOnInit() {
    this.userOn = JSON.parse(localStorage.getItem('userOn'));
    this.row = JSON.parse(localStorage.getItem('row'));
    this.timestamp = +localStorage.getItem('timestammp');
    if ( this.row.grafics === []) {
      this.criarAux2();
    }

    this.zonesService.getAll().subscribe(
      resultado =>{
        for (let zona of resultado){
          let zonaaux = new Zone(zona._id.$oid,zona.name,zona.description,zona.type,zona.min,zona.max);
          this.zones.push(zonaaux);
          let sensores : Sensor[] = [];
          if(zona.sensors){
            for(let sensor of zona.sensors){
              let sensoraux = new Sensor(sensor._id.$oid,sensor.name,sensor.description,sensor.latitude,sensor.longitude,sensor.hostname,sensor.min,sensor.max);
              sensores.push(sensoraux);
            }
          }
          this.sensor_zones.set(zona._id.$oid,sensores);
        }
      },
      error =>{
        console.log(error);
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.timestamp);
  }

  criarAux2(){
    if(this.graficSelectNow.metric){
      for( let metric of this.graficSelectNow.metric){
         console.log(metric)
        this.aux2.push(metric);
         console.log("vim aqui2")
        let i = this.aux2.find(x => x == metric);
      }
    }
  }

  getSensorZone(){
    if(this.model.zoneSelect){
      console.log(this.model.zoneSelect)
      console.log(this.sensor_zones.get(this.model.zoneSelect.id))
      return this.sensor_zones.get(this.model.zoneSelect.id);
    }
    return [];
  }

  createGraphic(){
    console.log("criar grafico")
    this.graficService.createGrafic(this.userOn.id, ""+this.row.id,"",1).subscribe(
      resultado =>{
        let metric : Metric[] = [ new Metric("","","","","") ]
        let graphicaux = new Grafic(resultado._id.$oid,resultado.name,resultado.rangeTime,metric);
        this.row.grafics.push(graphicaux);
        localStorage.setItem('row', JSON.stringify(localStorage.getItem('row')));
      }
    );
  }

  graphicSelect(graphic: String){
    this.graficSelectNow = JSON.parse(localStorage.getItem("graphic")).graphic;
    this.aux2 = [];
    this.model = {};
    this.criarAux2();
  }

  addMetric(){
    let metrica = new Metric("","","","","");
    this.aux2.push(metrica);
  }

  removeMetricGraphic(i){
    this.aux2.splice(i,1);
    this.metricService.removeMetric(this.userOn.id,this.row.id+"",this.graficSelectNow.id,this.row.grafics.find(x => x.id == this.graficSelectNow.id).metric[i].id).subscribe(
      resultado =>{
        this.row.grafics.find(x => x.id == this.graficSelectNow.id).metric.splice(i,1);
      }
    )
  }

  deleteGraphic(){
    if(this.row.grafics){
      let i = 0;
      if(this.graficSelectNow){
      for(let graphic of this.row.grafics){
        if(graphic.id == this.graficSelectNow.id){
          this.graficService.removeGraphic(this.userOn.id,this.row.id+"",this.graficSelectNow.id).subscribe(
            resultado =>{
              this.row.grafics.splice(i,1);
              this.removegraphic = true;
            },
            error =>{
              console.log(error)
            }
          );
          break;
        }
        i++;
      }
      }
    }
  }

  metricNew(metric){
    if(this.aux2[metric.i].zone != ""){
      
      this.aux2[metric.i].zone = metric.zone;
      this.aux2[metric.i].sensor = metric.sensor;

      this.metricService.removeMetric(this.userOn.id,this.row.id+"",this.graficSelectNow.id,this.aux2[metric.i].id).subscribe(
        resultado => {
        },
        error => {
          console.log(error)
        }
      )

      this.metricService.addMetric(this.userOn.id,this.row.id+"",this.graficSelectNow.id,this.aux2[metric.i].zone,this.aux2[metric.i].sensor).subscribe(
        resultado =>{
          let newMetric = new Metric(resultado._id.$oid,resultado.name, resultado.zone_id.$oid,resultado.sensor_id.$oid,"")
          this.row.grafics.find(x => x.id == this.graficSelectNow.id).metric.splice(metric.i,1,newMetric);
          this.graficSelectNow.metric.splice(metric.i,1,newMetric);
        },
        error =>{
          console.log(error)
        }
      )
      
    }
    else{

      this.aux2[metric.i].zone = metric.zone;
      this.aux2[metric.i].sensor = metric.sensor;

      this.metricService.addMetric(this.userOn.id,this.row.id+"",this.graficSelectNow.id,this.aux2[metric.i].zone,this.aux2[metric.i].sensor).subscribe(
        resultado =>{
          let newMetric = new Metric(resultado._id.$oid,resultado.name, resultado.zone_id.$oid,resultado.sensor_id.$oid,"")
          this.row.grafics.find(x => x.id == this.graficSelectNow.id).metric.push(newMetric);
          this.graficSelectNow.metric.push(newMetric);
        },
        error =>{
          console.log(error)
        }
      )
    }
  }

  numberGraphic(): number{
    return this.row.grafics.length;
  }

}
