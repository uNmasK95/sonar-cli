import { Component, OnInit } from '@angular/core';
import { Row } from "app/models/row";

@Component({
  selector: 'dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.css']
})
export class DashboardListComponent implements OnInit {

  rows: Row[] = [new Row(1),new Row(2)];

  constructor() { }

  ngOnInit() {
  }

}
