
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
  @Input() grafic : Grafic;
  @Output() graphicSelect = new EventEmitter();
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  private selectGraphic : boolean = false;

  //@ViewChild(BaseChartDirective) chart: BaseChartDirective;
  
  public lineChartData:Array<any> = [{data: [], label: 'First Sensor Ex'}/*
    {data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Sensor1'},
    {data: [28, 48, 40, 19, 86, 27, 90,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Sensor2'},
    {data: [18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40], label: 'Sensor3'}
  */];  
  public lineChartLabels:Array<any> = [/*'02h:16m:50s', '02h:16m:55s', '02h:17m:00s', '02h:17m:05s', 
          '02h:17m:10s', '02h:17m:15s', '02h:17m:20s','02h:16m:50s', '02h:16m:55s', '02h:17m:00s', '02h:17m:05s', 
          '02h:17m:10s', '02h:17m:15s', '02h:17m:20s','02h:16m:50s', '02h:16m:55s', '02h:17m:00s', '02h:17m:05s', 
          '02h:17m:10s', '02h:17m:15s', '02h:17m:20s','02h:16m:50s', '02h:16m:55s', '02h:17m:00s', '02h:17m:05s', 
          '02h:17m:10s', '02h:17m:15s', '02h:17m:20s'*/];
  public lineChartOptions:any = {
    responsive: true
      
  };

  public lineChartColors:Array<any> = [
      { // grey
        /*backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        //pointHoverBackgroundColor: '#fff',
        //pointHoverBorderColor: 'rgba(148,159,177,0.8)'*/
      },
      { // dark grey
        /*backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'*/
      },
      { // grey
        /*backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'*/
      }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private sensorvaluesservice: SensorValuesService,
              private sensorsService: SensorsService) { }

  public dataEdit : any[] = [0,10,20,30,40,50,60,70,80,90,100];

  ngOnInit() {

    
      if(this.grafic.metric){
        let index = 0;
        
        console.log("COMEÇA CARALHO SOU O EDIT!")
        this.lineChartData.splice(0,1);
        //this.divideTimestamp();
        this.lineChartLabels= [];

        for(let metrica of this.grafic.metric){
          //console.log(this.sensorzones.get(this.grafic.metric[0].zone));
          let values: Array<any> =[0,0,0,1,2,3,4,10,20,30,40,50,60,70,80,90,100];
          //.find(x => x.id == metrica.id)
          this.lineChartData.push({data: values, label: ""});

          this.sensorsService.getSensor(metrica.zone,metrica.sensor).subscribe(
            resultado =>{
              this.lineChartData[index].label = resultado.name;
            }
          )
          /*this.sensorsService.getSensorIdValues(metrica.zone,metrica.sensor,this.timestamp).subscribe(
            resultado =>{

              //console.log(this.timestamp)
              console.log(resultado)
              console.log(this.lineChartLabels)
              //console.log(this.lineChartData[index].data);
              
              for(let value of resultado){
                values.push( {value: value.value, timestamp: value.timestamp});
              }
              
              let k = 0;
              for(;k<this.lineChartLabels.length-1;k++){
                let timesAux = parseInt(this.lineChartLabels[k]);
                let timesAuxF = parseInt(this.lineChartLabels[k+1]);

                let findTimestamp = values.filter(res => res.timestamp>=timesAux && res.timestamp<=timesAuxF);


                if(findTimestamp.length != 0){//Encontrou
                  let sum = 0;
                  let number = findTimestamp.length;
                  for(let f of findTimestamp){
                    sum += f.value;
                  }
                  rValues.push(sum/number);
                  //rValues.push(findTimestamp.value);
                }else{//Nao encontrou
                  rValues.push(0);
                }
              }
              let timesAux = parseInt(this.lineChartLabels[k]);
              let findTimestamp = values.filter(res => res.timestamp>=timesAux);
              if(findTimestamp.length != 0){//Encontrou
                let sum = 0;
                let number = findTimestamp.length;
                for(let f of findTimestamp){
                  sum += f.value;
                }
                rValues.push(sum/number);
                //rValues.push(findTimestamp.value);
              }else{//Nao encontrou
                rValues.push(0);
              }
              
              //tratar ultimo 
              console.log(rValues);
              this.lineChartData[index].data = rValues;
                this.chart.ngOnChanges({});
                values = [];
                rValues = [];
            // this.lineChartData[index].data = rValues;
            },
            error =>{
              console.log(error)
            }
          )
          console.log(this.lineChartData[index].data);
          console.log("PUTA QUE PARIU")*/
          index++;
        }
      }
  }

  divideTimestamp(){
    
    let timenow = new Date();
    timenow.setSeconds(0);
    timenow.setMilliseconds(0);

    let t = timenow.getTime()-(1000 * 3600 * this.timestamp);
    //Dividir o eixo x

    console.log(t)

    let tamanho =  3600 * this.timestamp;
    let timestampAux = t/1000;

    this.lineChartLabels = new Array();
    
    for(let i=0;i<=tamanho;i =(30*this.timestamp)+i){
      this.lineChartLabels.push(''+timestampAux);
      timestampAux = 30 + timestampAux;
    }
    console.log(this.lineChartLabels)
    console.log("esta aqui o array")

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
    //console.log(this.grafic.id);
    //console.log(JSON.parse(localStorage.getItem('graphic')).graphic.id)
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

