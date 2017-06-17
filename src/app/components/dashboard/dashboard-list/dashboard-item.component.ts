import { Component, OnInit, Input,Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Row } from 'app/models/row';

@Component({
  selector: 'dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.css']
})
export class DashboardItemComponent implements OnInit {
  @Input() timestamp: number;
  @Input() row: Row;
  @Output() eliminalinha = new EventEmitter();

  constructor() { }

  ngOnInit() {
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
  }

}
