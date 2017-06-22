import {
  Component,
  OnInit,
  OnChanges,
  EventEmitter,
  Input,
  ViewChild,
  Output,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {Grafic} from '../../../../models/grafic';
import { SensorValuesService } from "app/services/sensorvalues.service";
import { Zone } from "app/models/zone";
import { Sensor } from "app/models/sensor";
import { SensorsService } from "app/services/sensors.service";

@Component({
  selector: 'dashboard-item-grafic',
  templateUrl: './dashboard-item-grafic.component.html',
  styleUrls: ['./dashboard-item-grafic.component.css']
})

export class DashboardItemGraficComponent implements OnInit, OnDestroy, OnChanges {

  @Input() timeview: number;
  @Input() refresh: number;
  @Input() grafic : Grafic;
  @Output() graphicSelect = new EventEmitter();

  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  private interval;
  private names: Array<String> = [];
  private antigorefresh: number = 5;
  private antigotimeview: number = 10;
  private refreshXgraphic: number = 5;
  private selectGraphic : boolean = false;
  private defaultValue: number = 20;
  private lastTimestamp: number;

  public lineChartData:Array<any>
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
     data: [{
        type: 'line'
     }],
     elements: {
        point: {
          radius: 1
        }
      },
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: true
      }]
    }
  };

  public lineChartColors: Array<any> = [];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  constructor(private sensorvaluesservice: SensorValuesService,
              private sensorsService: SensorsService) {
              }

  ngOnInit() {
    this.lineChartData = [];
    this.chartTimeDefault();

    if ( this.grafic.metric ) {
      let metricPosition = 0;
      for ( const metric of this.grafic.metric ){
        this.chartMetricDefaultInit(metricPosition, 'metric ' + metricPosition);
        this.chartGetFristValuesForMetric( metricPosition, metric);
        metricPosition++;
      }
      this.setIntervalMetrics();
    }
  }

  ngOnDestroy() {
    // Will clear when component is destroyed e.g. route is navigated away from.
    clearInterval(this.interval);
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log('Timeview: ' + this.timeview + '-> Antigo Timeview: ' + this.antigotimeview );
    console.log('Refresh: ' + this.refresh + '-> Antigo Refresh: ' + this.antigorefresh );

    if ( this.timeview !== this.antigotimeview || this.refresh !== this.antigorefresh){
      clearInterval(this.interval);

      if ( this.timeview !== this.antigotimeview ) {
        this.chartTimeDefault();
        if ( this.grafic.metric ) {
          let metricPosition = 0;
          for ( const metric of this.grafic.metric ){
            this.chartMetricDefaultChange(metricPosition);
            this.chartGetFristValuesForMetric( metricPosition, metric);
            metricPosition++;
          }
        }
      }
      this.setIntervalMetrics();

      this.antigorefresh = this.refresh;
      this.antigotimeview = this.timeview;
    }
  }

  chartTimeDefault() {
    this.lineChartLabels = [];
    const dateNow: Date = new Date();
    dateNow.setMilliseconds(0);
    const timestampNow: number = dateNow.getTime() / 1000;
    let timestampLater: number = timestampNow;

    // Adicionar valores ao eixo do Xs
    for (let i = 0; i < (60 * this.timeview) / this.refresh; i++ ) {
      this.lineChartLabels.unshift( timestampLater );
      timestampLater = timestampLater - this.refreshXgraphic;
    }
  }


  chartMetricDefaultInit(metricPosition: number, label: string) {
    this.lineChartColors.push({ // red
        backgroundColor: 'rgba(0,0,0,0)',
        borderColor: 'rgba(255,0,0,1)',
    });
    this.lineChartData.push({ label: label, data: [ ] });
    // Adicionar valores ao eixo do Xs
    for (let i = 0; i < (60 * this.timeview) / this.refresh; i++ ) {
      this.lineChartData[metricPosition].data.push( this.defaultValue );
    }
  }

  chartMetricDefaultChange(metricPosition: number) {
    this.lineChartData[metricPosition].data = [];
    // Adicionar valores de dados
    for (let i = 0; i < (60 * this.timeview) / this.refresh; i++ ) {
      this.lineChartData[metricPosition].data.push( this.defaultValue );
    }
  }

  chartGetFristValuesForMetric( metricPosition: number, metrica: any ) {
    this.sensorsService.getSensorIdValues( metrica.zone, metrica.sensor, 1 ).subscribe(
      resultado => {
        for ( const value of resultado ){
          // TODO fazer verificação entre timestamps
          this.chartAddValue(metricPosition, {value: value.value, timestamp: value.timestamp});
        }
        this.chart.ngOnChanges({});
      },
      error => {
        console.log(error);
      }
    );
  }

  refreshMetric( metricPosition: number, metric: any )  {
    this.sensorsService.getSensorLastValues( metric.zone, metric.sensor, this.lastTimestamp).subscribe(
      resultado => {
        if( resultado.length === 0) {
          this.chartAddDefaultValue(metricPosition);
        } else {
          for ( const value of resultado){
            this.chartAddValue(metricPosition, {value: value.value, timestamp: value.timestamp});
          }
        }
        this.chart.ngOnChanges({});
      },
      error => {
        console.log('error get new metrics');
      }
    );
  }

  diffTimestamp(lastTimestamp: number, nowTimestamp: number): number{
    return (nowTimestamp - lastTimestamp) / this.refreshXgraphic || 0;
  }

  chartAddDefaultValue(metricPosition: number){
    this.lineChartData[metricPosition].data.splice(0, 1);
    this.lineChartData[metricPosition].data.push( this.defaultValue );
  }

  chartAddValue(metricPosition: number, value: any){
    const numberOfJumps: number = this.diffTimestamp(this.lastTimestamp, value.timestamp);
    // se o numero de jumps for maior que 1
    for ( let i = 0; i < numberOfJumps - 1; i++ ) {
      this.chartAddDefaultValue(metricPosition);
    }
    this.lineChartData[metricPosition].data.splice(0, 1);
    this.lineChartData[metricPosition].data.push( value.value );
    this.lastTimestamp = value.timestamp;
  }

  setIntervalMetrics() {
    if (this.grafic.metric) {
      this.interval = setInterval( () => {
        let metricPosition = 0;
        for ( const metric of this.grafic.metric ){
          this.refreshMetric( 0, this.grafic.metric[0] );
          metricPosition++;
        }
      }, 1000 * this.refresh);
    }
  }

}
