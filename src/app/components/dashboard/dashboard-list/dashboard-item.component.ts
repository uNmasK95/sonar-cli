import { Component, OnInit, Input,Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Row } from 'app/models/row';
import { SensorValuesService } from "app/services/sensorvalues.service";

@Component({
  selector: 'dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {
  @Input() timestamp: number;
  @Input() row: Row;
  @Output() eliminalinha = new EventEmitter();

  constructor(private sensorValuesService:SensorValuesService) { }

  ngOnInit() {
    console.log(this.timestamp);
    console.log(this.row)
    console.log("dada")
  }

   ngOnChanges(changes: SimpleChanges) {
    console.log(this.timestamp);
  }

  deleteRow(){
    localStorage.setItem("deleteRow",JSON.stringify({ row : this.row}));
    this.eliminalinha.emit();
  }

  putRow(){
    localStorage.setItem('row', JSON.stringify(this.row));
    localStorage.setItem('timeStamp', this.timestamp+"");
    console.log(this.row)
    console.log(this.timestamp)
  }

}
