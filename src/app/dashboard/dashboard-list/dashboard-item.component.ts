import { Component, OnInit, Input } from '@angular/core';
import { Row } from "app/models/row";

@Component({
  selector: 'dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {
  @Input() row: Row;
  constructor() { }

  ngOnInit() {
  }

}
