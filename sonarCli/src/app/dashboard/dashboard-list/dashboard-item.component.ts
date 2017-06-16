import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Row } from "app/models/row";

@Component({
  selector: 'dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {
  @Input() timestamp: number;
  @Input() row: Row;
 
  constructor() { }

  ngOnInit() {
  }

   ngOnChanges(changes: SimpleChanges) {
    console.log(this.timestamp);
  }

  putRow(){
    localStorage.setItem('row',JSON.stringify(this.row));
  }

}
