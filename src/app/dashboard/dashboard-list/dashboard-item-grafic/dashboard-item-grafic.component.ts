import { Component, OnInit, EventEmitter, Input, ViewChild, Output } from '@angular/core';
import { Grafic } from "../../../models/grafic";
import { BaseChartDirective } from "ng2-charts";

@Component({
  selector: 'dashboard-item-grafic',
  templateUrl: './dashboard-item-grafic.component.html',
  styleUrls: ['./dashboard-item-grafic.component.css']
})

export class DashboardItemGraficComponent implements OnInit {

  @Input() timestamp: number;
  @Input() grafic : Grafic;
  @Output() graphicSelect = new EventEmitter();

  private selectGraphic : boolean = false;

  //@ViewChild(BaseChartDirective) chart: BaseChartDirective;
  
  public lineChartData:Array<any> = [
    {data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Sensor1'},
    {data: [28, 48, 40, 19, 86, 27, 90,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Sensor2'},
    {data: [18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40], label: 'Sensor3'}
  ];  
  public lineChartLabels:Array<any> = ['02h:16m:50s', '02h:16m:55s', '02h:17m:00s', '02h:17m:05s', 
          '02h:17m:10s', '02h:17m:15s', '02h:17m:20s','02h:16m:50s', '02h:16m:55s', '02h:17m:00s', '02h:17m:05s', 
          '02h:17m:10s', '02h:17m:15s', '02h:17m:20s','02h:16m:50s', '02h:16m:55s', '02h:17m:00s', '02h:17m:05s', 
          '02h:17m:10s', '02h:17m:15s', '02h:17m:20s','02h:16m:50s', '02h:16m:55s', '02h:17m:00s', '02h:17m:05s', 
          '02h:17m:10s', '02h:17m:15s', '02h:17m:20s'];
  public lineChartOptions:any = {
    responsive: true
      
  };

  public lineChartColors:Array<any> = [
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
      { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
      },
      { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor() { }

  ngOnInit() {
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
    //console.log(this.grafic.id);
    //console.log(JSON.parse(localStorage.getItem('graphic')).graphic.id)
    if(JSON.parse(localStorage.getItem('graphic')).graphic.id == this.grafic.id){
      return true;
    }
    else{
      return false;
    }
  }
}
