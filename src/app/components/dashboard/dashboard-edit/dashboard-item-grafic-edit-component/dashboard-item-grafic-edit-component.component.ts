
import { Component, OnInit, OnChanges, EventEmitter, Input, ViewChild, Output, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {Grafic} from '../../../../models/grafic';
import { SensorValuesService } from "app/services/sensorvalues.service";
import { Zone } from "app/models/zone";
import { Sensor } from "app/models/sensor";
import { SensorsService } from "app/services/sensors.service";

@Component({
  selector: 'dashboard-itemgraficeditcomponent',
  templateUrl: './dashboard-item-grafic-edit-component.component.html',
  styleUrls: ['./dashboard-item-grafic-edit-component.component.css']
})

export class DashboardItemGraficEditComponentComponent implements OnInit {

  @Input() timestamp: number;
  @Input() grafic: Grafic;
  @Output() graphicSelect = new EventEmitter();
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  private selectGraphic : boolean = false;
  
  public lineChartData:Array<any> = [{data: [], label: 'No Sensor'}];  
  public lineChartLabels:Array<any> = [ ];
  public lineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false
  };

  public lineChartColors:Array<any> = [ ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private sensorvaluesservice: SensorValuesService,
              private sensorsService: SensorsService) { }

  public dataEdit : any[] = [0,10,20,30,40,50,60,70,80,90,100];

  ngOnInit() {

    
      if(this.grafic.metric){
        let index = 0;
        
        console.log("COMEÇA CARALHO SOU O EDIT!");
        this.lineChartLabels= [];

        for(let metrica of this.grafic.metric){
          if(index == 0){
            this.lineChartData.splice(0,1);
          }
          let values: Array<any> =[0,0,0,1,2,3,4,10,20,30,40,50,60,70,80,90,100];
          this.lineChartData.push({data: values, label:metrica.sensor});
          console.log(this.lineChartData[index])

          if( metrica.zone && metrica.sensor){
            this.sensorsService.getSensor(metrica.zone,metrica.sensor).subscribe(
              resultado => {
                this.lineChartData.find(x => x.label == resultado._id.$oid).label = resultado.name;
                this.chart.ngOnChanges({});
              }
            );
          }
          index++;
        }
      }
      else{
        console.log("nao deu nada")
      }
  }

  ngOnChanges(changes: SimpleChanges){
    if(localStorage.getItem("graphic")){
      if(JSON.parse(localStorage.getItem("graphic")).id == this.grafic.id){
        console.log(this.grafic);
        console.log("mudei o grafico ou sou o mesmo")
      }
    }
  }

  //#################Chart################

  // events
  public chartClicked(e:any):void {
    console.log(e);
    localStorage.setItem("graphic",JSON.stringify({graphic : this.grafic}));
    console.log(this.grafic);

    this.graphicSelect.emit();
    this.selectGraphic=true;
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
  //#################Chart################


  selectd(){
    if(localStorage.getItem('graphic')){
      if(JSON.parse(localStorage.getItem('graphic')).graphic.id == this.grafic.id){
        return true;
      }
      else{
        return false;
      } 
    }
  }
}

