import { Component, OnInit, OnChanges, EventEmitter, Input, ViewChild, Output, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
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

export class DashboardItemGraficComponent implements OnInit {

  @Input() timestamp: number;
  @Input() refresh: number;
  @Input() grafic : Grafic;
  @Output() graphicSelect = new EventEmitter();
  
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;

  interval;
  names : Array<String> = [];
  antigorefresh: number = 5;
  antigotimestamp: number = 1;
  refreshXgraphic: number = 5;
  private selectGraphic : boolean = false;

  //@ViewChild(BaseChartDirective) chart: BaseChartDirective;
  
  public lineChartData:Array<any> /*{data: [], label: 'First Sensor Ex'} /*
    {data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Sensor1'},
    {data: [28, 48, 40, 19, 86, 27, 90,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Sensor2'},
    {data: [18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40,18, 48, 77, 9, 100, 27, 40], label: 'Sensor3'}
  */
  public lineChartLabels:Array<any> = [/*'02h:16m:50s', '02h:16m:55s', '02h:17m:00s', '02h:17m:05s', 
          '02h:17m:10s', '02h:17m:15s', '02h:17m:20s','02h:16m:50s', '02h:16m:55s', '02h:17m:00s', '02h:17m:05s', 
          '02h:17m:10s', '02h:17m:15s', '02h:17m:20s','02h:16m:50s', '02h:16m:55s', '02h:17m:00s', '02h:17m:05s', 
          '02h:17m:10s', '02h:17m:15s', '02h:17m:20s','02h:16m:50s', '02h:16m:55s', '02h:17m:00s', '02h:17m:05s', 
          '02h:17m:10s', '02h:17m:15s', '02h:17m:20s'*/];
  public lineChartOptions:any = {
    responsive: true,
     data: [{
        type: "line",
     }],
    
     elements:{
        point:{
          radius:1
        }
      },
    scales: {
      
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: true
      }],
      
	}
      
  };

  public lineChartColors:Array<any> = [];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(private sensorvaluesservice: SensorValuesService,
              private sensorsService: SensorsService) {
              }

  ngOnInit() {
      this.chart.datasets = undefined;
      this.lineChartData = [];
      console.log(this.grafic)
      this.antigotimestamp = this.timestamp;
      this.antigorefresh = this.refresh;
      if(this.grafic.metric){
        let index = 0;

        //this.lineChartData.splice(0,1)
        
        console.log("COMEÇA CARALHO")

        this.divideTimestamp();

        for(let metrica of this.grafic.metric){
          let values: Array<any> =[];
          let rValues = [];
          this.lineChartColors.push({backgroundColor: 'rgba(0,0,0,0)', borderColor: 'rgba(255,0,0,1)'})
          this.lineChartData.push({data: new Array(), label: metrica.sensor});
          
          this.sensorsService.getSensorIdValues(metrica.zone,metrica.sensor,1).subscribe(
            resultado =>{
              
              console.log("dadadandiandiw")
              //console.log(this.timestamp)
              //console.log(a«)
              //console.log(resultado)
              //console.log(this.lineChartLabels)
              //console.log(this.lineChartData[index].data);
              
              for(let value of resultado){
                values.push( {value: value.value, timestamp: value.timestamp});
              }
              
              let k = 0;
              for(;k<this.lineChartLabels.length-2;k++){
                let timesAux = parseInt(this.lineChartLabels[k]);
                let timesAuxF = parseInt(this.lineChartLabels[k+1]);

                let findTimestamp = values.filter(res => res.timestamp>=timesAux && res.timestamp<=timesAuxF);


                if(findTimestamp.length != 0){//Encontrou
                  /*let sum = 0;
                  let number = findTimestamp.length;
                  for(let f of findTimestamp){
                    sum += f.value;
                  }
                  rValues.push(sum/number);*/
                  rValues.push(findTimestamp[0].value);
                }else{//Nao encontrou
                  rValues.push(20);
                }
              }
              let timesAux = parseInt(this.lineChartLabels[k]);
              let findTimestamp = values.filter(res => res.timestamp>=timesAux);
              if(findTimestamp.length != 0){//Encontrou
                /*let sum = 0;
                let number = findTimestamp.length;
                for(let f of findTimestamp){
                  sum += f.value;
                }
                rValues.push(sum/number);*/
                rValues.push(findTimestamp[0].value);
                //rValues.push(findTimestamp.value);
              }else{//Nao encontrou
                rValues.push(20);
              }
              
              //tratar ultimo 
              //console.log(rValues);
              this.lineChartData.find(x => x.label == metrica.sensor).data = rValues;
              //this.lineChartData[index].data = rValues;
                //if(this.lineChartData){
                  //console.log(this)
                 this.chart.ngOnChanges({});

                 //}   
                //}
                values = [];
                rValues = [];

              console.log(this.lineChartData)
            // this.lineChartData[index].data = rValues;
            },
            error =>{
              console.log(error)
            }
          )
          //console.log(this.lineChartData[index].data);
          //console.log("PUTA QUE PARIU")
          index++;
        }
      }
      this.setIntervals();
  }
  setIntervals(){

      this.interval = setInterval(() => {
        for(let metrica of this.grafic.metric){
          let values: Array<any> =[];
          let rValues = this.lineChartData.find(x => x.label == metrica.sensor).data
          console.log(rValues);
          console.log("rvavva")
          console.log(this.lineChartLabels.length)
        let t: number = this.refresh/5;
        this.lineChartLabels.splice(0,t);
        rValues.splice(0,t);
        let p = this.lineChartLabels[0];
        let numerocomeca = this.lineChartLabels.length;

        let inicio = this.lineChartLabels[numerocomeca-t];

        for(let i = this.lineChartLabels.length;i<(this.lineChartLabels.length+t) ;i++){
          inicio = parseInt(inicio+'') + this.refreshXgraphic;
          //  console.log(i);
          // console.log(p);
          console.log(this.lineChartLabels.length+t);
          console.log(i)
          console.log("sou o i")
          console.log(p)
          console.log("SOU O P")
          console.log(inicio)
          this.lineChartLabels.push(inicio+'');
          break;
        }
        console.log(p)  
        console.log("SOU O P")
        console.log(inicio)

        this.sensorsService.getSensorIdValues(metrica.zone,metrica.sensor,p).subscribe(
          resultado=>{
            let i = 0;
            let values : Array<any>= []
            for(let value of resultado){
              values.push( {value: value.value, timestamp: value.timestamp});
              i++;
            }

            //console.log(t);
            //console.log(numerocomeca)
            //console.log("comeca")
            //console.log(this.lineChartLabels.length)
            //console.log("tamanho")
            this.lineChartData.find(x => x.label == metrica.sensor).data.splice(0,t-1);
            //let k = this.lineChartLabels.length -1;
            
            for(;numerocomeca<this.lineChartLabels.length-2;numerocomeca++){
              let timesAux = parseInt(this.lineChartLabels[numerocomeca]);
              let timesAuxF = parseInt(this.lineChartLabels[numerocomeca+1]);

              let findTimestamp = values.filter(res => res.timestamp>=timesAux && res.timestamp<=timesAuxF);


              if(findTimestamp.length != 0){//Encontrou
                /*let sum = 0;
                let number = findTimestamp.length;
                for(let f of findTimestamp){
                  sum += f.value;
                }
                rValues.push(sum/number);*/
                rValues.push(findTimestamp[0].value);
              }else{//Nao encontrou
                rValues.push(20);
              }
            }
            let timesAux = parseInt(this.lineChartLabels[numerocomeca-2]);
            //console.log(numerocomeca)
            //console.log(this.lineChartLabels[numerocomeca-1])

            let findTimestamp = values.filter(res => res.timestamp>=timesAux);
            console.log(findTimestamp);
            console.log("timestamp")
            console.log(timesAux);
            if(findTimestamp.length != 0){//Encontrou
              /*let sum = 0;
              let number = findTimestamp.length;
              for(let f of findTimestamp){
                sum += f.value;
              }
              rValues.push(sum/number);*/
              //console.log(findTimestamp[0].value)
              //console.log("vim ao time")
              rValues.push(findTimestamp[0].value);

              //rValues.push(findTimestamp.value);
            }else{//Nao encontrou
              console.log("vou colocar o valor 0")
              rValues.push(20);
            }
            this.lineChartData.find(x => x.label == metrica.sensor).data = rValues;
            //this.lineChartData[index].data = rValues;
              //if(this.lineChartData){
            this.chart.ngOnChanges({});
            //console.log(rValues);
            console.log("atuaddddliza")
            
          
          }
        )
        }
      }, 1000 * this.refresh);
    }
  ngOnDestroy() {
      // Will clear when component is destroyed e.g. route is navigated away from.
    clearInterval(this.interval);
  }
  

  divideTimestamp(){
    
    let timenow = new Date();
    timenow.setSeconds(0);
    timenow.setMilliseconds(0);

    let t = timenow.getTime()-(1000 * 3600 * this.timestamp);
    //Dividir o eixo x

    //console.log(t)

    let tamanho =  3600 * this.timestamp;
    let timestampAux: number = t/1000;
    console.log(timestampAux)

    this.lineChartLabels = new Array();
    this.lineChartLabels = [];


    for(let i=0;i<=tamanho;i =this.refreshXgraphic+i){
      this.lineChartLabels.push(timestampAux+'');
      timestampAux = parseInt(timestampAux+'') + this.refreshXgraphic;
      //console.log(timestampAux)
    }
    //console.log(this.lineChartLabels)
    //console.log("esta aqui o array")
  }

  ngOnChanges(changes: SimpleChanges){
    console.log("mudei o refresh")
    if(localStorage.getItem("graphic")){
      if(JSON.parse(localStorage.getItem("graphic")).id == this.grafic.id){
        console.log(this.grafic);
        console.log("mudei o grafico ou sou o mesmo")
      }
    }
    if(this.timestamp != this.antigotimestamp || this.refresh != this.antigorefresh){
        clearInterval(this.interval);
        console.log("mudei o refresh")
        this.antigorefresh = this.refresh;
        this.antigotimestamp = this.timestamp;
        if(this.grafic.metric){
        let index = 0;
        //this.lineChartData = [{data: [], label: 'First Sensor Ex'}];

       // this.lineChartData.splice(0,1)
        
        console.log("COMEÇA CARALHO")

       // this.divideTimestamp();

        for(let metrica of this.grafic.metric){
          let values: Array<any> =[];
          let rValues = [];
          
          //this.lineChartData.push({data: new Array(), label: metrica.sensor});
          
          this.sensorsService.getSensorIdValues(metrica.zone,metrica.sensor,1).subscribe(
            resultado =>{

              //console.log(this.timestamp)
              console.log(resultado)
              console.log(this.lineChartLabels)
              
              for(let value of resultado){
                values.push( {value: value.value, timestamp: value.timestamp});
              }
              
              let k = 0;
              for(;k<this.lineChartLabels.length-2;k++){
                let timesAux = parseInt(this.lineChartLabels[k]);
                let timesAuxF = parseInt(this.lineChartLabels[k+1]);

                let findTimestamp = values.filter(res => res.timestamp>=timesAux && res.timestamp<=timesAuxF);


                if(findTimestamp.length != 0){//Encontrou
                  /*let sum = 0;
                  let number = findTimestamp.length;
                  for(let f of findTimestamp){
                    sum += f.value;
                  }
                  rValues.push(sum/number);*/
                  //rValues.push(findTimestamp.value);
                  rValues.push(findTimestamp[0].value);
                }else{//Nao encontrou
                  rValues.push(null);
                }
              }
              let timesAux = parseInt(this.lineChartLabels[k]);
              let findTimestamp = values.filter(res => res.timestamp>=timesAux);
              if(findTimestamp.length != 0){//Encontrou
               /* let sum = 0;
                let number = findTimestamp.length;
                for(let f of findTimestamp){
                  sum += f.value;
                }
                rValues.push(sum/number);*/
                //rValues.push(findTimestamp.value);
                  rValues.push(findTimestamp[0].value);
              }else{//Nao encontrou
                rValues.push(20);
              }
              
              
              //tratar ultimo 
              //console.log(rValues);
               this.lineChartData.find(x => x.label == metrica.sensor).data = rValues;
              //this.lineChartData[index].data = rValues;
                //if(this.lineChartData){
                 this.chart.ngOnChanges({});

               
                //}
                /*setInterval(() => {
                  console.log("damidmadiw");
                }, 5000);
                setInterval(() => {
                  console.log("ola")
                  this.sensorsService.getSensorIdValues(metrica.zone,metrica.sensor,1).subscribe(
                    resultado=>{
                      values = [];

                      for(let value of resultado){
                        values.push( {value: value.value, timestamp: value.timestamp});
                      }

                      console.log(values);

                    }
                  )
                }, 5000);*/
                
                rValues = [];

              console.log(this.lineChartData)
            // this.lineChartData[index].data = rValues;
            },
            error =>{
              console.log(error)
            }
          )
          //console.log(this.lineChartData[index].data);
          //console.log("PUTA QUE PARIU")
          index++;
        }
      }
       this.setIntervals();
       console.log("sET iNTREVAL AQUI")
    }
  }

  //#################Chart################

  // events
  /*public chartClicked(e:any):void {
    console.log(e);
    localStorage.setItem("graphic",JSON.stringify({graphic : this.grafic}));
    console.log(this.grafic);

    this.graphicSelect.emit();
    this.selectGraphic=true;
  }*/

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
