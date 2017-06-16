import { Component, OnInit, Input } from '@angular/core';
import { Row } from "app/models/row";
import { Grafic } from "app/models/grafic";

@Component({
  selector: 'dashboard-edit',
  templateUrl: './dashboard-edit.component.html',
  styleUrls: ['./dashboard-edit.component.css']
})
export class DashboardEditComponent implements OnInit {

  @Input() timestamp: number;
  
  row: Row;
  constructor() { }

  ngOnInit() {
    this.row = JSON.parse(localStorage.getItem('row'));
    console.log(this.timestamp);
  }


  graphicSelect(graphic: String){
    console.log(JSON.parse(localStorage.getItem("graphic")));
    //console.log(JSON.parse(graphic));
  }


}
