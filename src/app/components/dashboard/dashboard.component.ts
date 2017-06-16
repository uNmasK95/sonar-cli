import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  model : any = {};

  constructor() { }
//oma dashboard tem linhas uma linha tem varios graficos e um grafico tem metricas
  ngOnInit() {
    this.model.timestamp = 1;
    this.model.refresh = 5;
  }

}
