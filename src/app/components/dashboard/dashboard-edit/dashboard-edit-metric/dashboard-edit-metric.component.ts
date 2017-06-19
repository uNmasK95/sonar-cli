import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Grafic } from "app/models/grafic";
import { Metric } from "app/models/metric";
import { ZonesService } from "app/services/zones.service";
import { Sensor } from "app/models/sensor";
import { Zone } from "app/models/zone";

@Component({
  selector: 'dashboard-edit-metric',
  templateUrl: './dashboard-edit-metric.component.html',
  styleUrls: ['./dashboard-edit-metric.component.css']
})
export class DashboardEditMetricComponent implements OnInit {

  @Input() index : number;
  @Input() metric : Metric;
  @Input() zones: Zone[];
  @Input() sensorzones : Map<string,Sensor[]>;
  @Output() removeMetric = new EventEmitter();
  @Output() metricNewComming = new EventEmitter();
  

  model : any ={}
  sensors : Sensor[];
  metricNew : any = {};

  constructor(private zonesService:ZonesService) { }

  ngOnInit() {
    console.log(this.index);
    this.model.zone = this.metric.zone;
    this.sensors = this.sensorzones.get(this.metric.zone);
    this.model.sensor = this.metric.sensor;
  }

/*  ngOnchanges(){
    this.grafic = JSON.parse(localStorage.getItem("graphic"));
  }*/
  getMetrics($event){
      console.log($event)
      console.log("Get metrics")
      this.metricNew.i = this.index;
      this.metricNew.zone = $event;
      this.sensors = this.sensorzones.get($event);
  }

  remove(){
    this.removeMetric.emit(this.index);
    /*console.log("remove")
    this.aux2.splice(i,1);
    this.metricService.removeMetric(this.userOn.id,this.row.id+"",this.graficSelectNow.id,this.row.grafics.find(x => x.id == this.graficSelectNow.id).metric[i].id).subscribe(
      resultado =>{
        this.row.grafics.find(x => x.id == this.graficSelectNow.id).metric.splice(i,1);
      }
    )*/
  }

  getSensor($event){
    console.log("getSensor")
    // estou a ver se ja existe a metrica ou se é nova para saber que tenho de remover a antiga
    
    console.log(this.model);
    this.metricNew.sensor = $event;
    this.metricNewComming.emit(this.metricNew);
    /*if(this.aux2[i].sensor != ""){
      console.log("estou aqui no remove metrica");
      this.metricService.removeMetric(this.userOn.id,this.row.id+"",this.graficSelectNow.id,this.aux2[i].id).subscribe(

      )
    }
       console.log(this.graficSelectNow)
    this.aux2[i].sensor = $event;
    this.metricService.addMetric(this.userOn.id,this.row.id+"",this.graficSelectNow.id,this.aux2[i].zone,this.aux2[i].sensor).subscribe(
      resultado =>{
        let newMetric = new Metric(resultado._id.$oid,resultado.name, resultado.zone_id,resultado.sensor_id)
        this.row.grafics.find(x => x.id == this.graficSelectNow.id).metric.splice(i,1,newMetric);
      }
    )*/

    //enviar evento a dizer que mudou a metrica ou adicionei uma metrica.
  }

}
