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
  @Input() refresh: number;
  @Input() row: Row;
  @Output() eliminalinha = new EventEmitter();

  constructor(private sensorValuesService:SensorValuesService) { }

  ngOnInit() {

  }

   ngOnChanges(changes: SimpleChanges) {

  }

  deleteRow(){
    localStorage.setItem("deleteRow",JSON.stringify({ row : this.row}));
    this.eliminalinha.emit();
  }

  putRow(){
    localStorage.setItem('row', JSON.stringify(this.row));
    localStorage.setItem('timeStamp', this.timestamp+"");
  }

}
