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

  @Input() index: number;
  @Input() metric: Metric;
  @Input() zones: Zone[];
  @Input() sensorzones: Map<string,Sensor[]>;
  @Output() removeMetric = new EventEmitter();
  @Output() metricNewComming = new EventEmitter();
  

  model: any ={}
  sensors: Sensor[];
  metricNew: any = {};

  constructor(private zonesService:ZonesService) { }

  ngOnInit() {
    this.model.zone = this.metric.zone;
    this.sensors = this.sensorzones.get(this.metric.zone);
    this.model.sensor = this.metric.sensor;
  }

/*  ngOnchanges(){
    this.grafic = JSON.parse(localStorage.getItem("graphic"));
  }*/
  getMetrics($event){
      this.metricNew.i = this.index;
      this.metricNew.zone = $event;
      this.sensors = this.sensorzones.get($event);
  }

  remove(){
    this.removeMetric.emit(this.index);
  }

  getSensor($event){
    this.metricNew.sensor = $event;
    this.metricNewComming.emit(this.metricNew);
  }

}
